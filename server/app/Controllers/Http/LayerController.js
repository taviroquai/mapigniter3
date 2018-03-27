'use strict'

const Layer = use('App/Models/Layer')
const Postgis = use('App/Models/Postgis')
const OGC = use('App/Models/OGC')

class LayerController {

    /**
     * Layer index
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async index ({request, response}) {
        try {
            const items = await Layer.all()
            response.send({success: true, items });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Layer item
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async item ({request, params, response}) {
        try {
            const item = await Layer.find(params.id)
            await item.load('projection');
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Layer store
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async store ({request, response}) {
        try {

            // Get input
            const post = request.post()

            // Validate input
            const errors = await Layer.validate(post)
            if (errors) return response.send({
                success: false,
                error: 'Error: check invalid fields',
                errors
            })

            // Fields to be save
            const data = {}
            const fields = [
                'title',
                'seo_slug',
                'publish',
                'image',
                'description',
                'feature_info_template',
                'search',
                'type',
                'projection_id',
                'min_resolution',
                'max_resolution',
                'bing_key',
                'bing_imageryset',
                'mapquest_layer',
                'gpx_filename',
                'kml_filename',
                'geopackage_filename',
                'geopackage_table',
                'geopackage_fields',
                'geojson_geomtype',
                'geojson_attributes',
                'geojson_features',
                'postgis_host',
                'postgis_port',
                'postgis_user',
                'postgis_dbname',
                'postgis_schema',
                'postgis_table',
                'postgis_field',
                'postgis_attributes',
                'wms_url',
                'wms_version',
                'wms_servertype',
                'wms_tiled',
                'wms_layers',
                'wfs_url',
                'wfs_version',
                'wfs_typename'
            ].forEach(f => data[f] = post[f])

            // Save
            var item = await Layer.find(post.id || 0)
            if (item) item.merge(data)
            else item = await Layer.create(data)
            await item.save()
            await item.load('projection');

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Store layer image
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async storeImage ({request, params, response}) {
        try {

            // Get map
            const item = await Layer.find(params.id)
            const post = request.post()

            // Process upload
            item.image = await item.processFileUpload(request, 'image', ['image'])
            if (!item.image) throw new Error('Could not upload image')
            await item.save()
            await item.load('projection');

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Store  file
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async storeFile ({request, params, response}) {
        try {

            // Get map
            const item = await Layer.find(params.id)
            const post = request.post()

            // Process upload
            item[post.field] = await item.processFileUpload(request, 'file', ['application'])
            if (!item[post.field]) throw new Error('Could not upload file')
            await item.save()
            await item.load('projection');

            // Send response
            response.send({success: true, item });
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Remove item
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  params   The URI params
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async remove ({request, params, response}) {
        try {
            const item = await Layer.find(params.id)
            await item.delete()
            response.send({success: true});
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Layer get resource file
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async getResource ({request, params, response}) {
        try {
            const item = await Layer.find(params.id);
            if (!item) return response.status(404);
            const filename = item.getStoragePath()+'/'+params.name;
            response.download(filename);
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Connect to postgis database and return database schema
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async postgisConnect ({request, response}) {
        try {
            const layer = request.post()
            const config = {
                client: 'pg',
                connection: {
                    host: layer.postgis_host,
                    port: layer.postgis_port,
                    user: layer.postgis_user,
                    password: layer.postgis_pass,
                    database: layer.postgis_dbname,
                }
            }
            const db = new Postgis(config)
            await db.connect()
            const options = await db.getLayerOptions();
            if (!options) throw new Error('Could not connect to postgis database');
            response.send({success: true, options: options});
        } catch (error) {
            response.send({success: false, error: error.message})
        }
    }

    /**
     * Connect to postgis database and return database schema
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async postgisGeoJSON ({request, params, response}) {
        try {
            const layer = await Layer.find(params.id)
            await layer.load('projection')

            // Connect to database
            const config = {
                client: 'pg',
                connection: {
                    host: layer.postgis_host,
                    port: layer.postgis_port,
                    user: layer.postgis_user,
                    password: layer.postgis_pass,
                    database: layer.postgis_dbname,
                }
            }
            const db = new Postgis(config)
            await db.connect()

            // Get GeoJSON
            const query = request.get()
            const geojson = await layer.asGeoJSON(db, query);
            if (!geojson) throw new Error('Could not connect to postgis database');
            response.send(geojson);
        } catch (error) {
            response.send({error: error.message})
        }
    }

    /**
     * Get OGC WMS Capabilities
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async getWMSCapabilities ({request, response}) {
        try {
            const layer = request.post()
            const ogc = new OGC(layer.wms_url)
            const capabilities = await ogc.getWMSCapabilities(layer.wms_version);
            if (!capabilities) throw new Error('Could not connect to WMS service');
            response.header('Content-type', 'text/xml')
            response.send(capabilities);
        } catch (error) {
            response.send('')
        }
    }

    /**
     * Get OGC WMS Capabilities
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async getWFSCapabilities ({request, response}) {
        try {
            const layer = request.post()
            const ogc = new OGC(layer.wfs_url)
            const capabilities = await ogc.getWFSCapabilities(layer.wfs_version);
            if (!capabilities) throw new Error('Could not connect to WFS service');
            response.header('Content-type', 'text/xml')
            response.send(capabilities);
        } catch (error) {
            response.send('')
        }
    }
}

module.exports = LayerController
