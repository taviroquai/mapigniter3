'use strict'

const Layer = use('App/Models/Layer')
const Postgis = use('App/Models/Postgis')
const OGC = use('App/Models/OGC')

class LayerController {

    /**
     * Store  file
     *
     * @param  {Object}  request  The HTTP request
     * @param  {Object}  response The HTTP response
     * @return {Promise}
     */
    async storeFile ({request, params, response}) {
        try {

            // Validate map
            const item = await Layer.find(params.id)
            if (!item) throw new Error('Layer not found')

            // Set upload valid types
            // See https://adonisjs.com/docs/4.0/file-uploads
            const post = request.post()
            const field = params.field
            var types
            switch(field) {
                case 'image': types = ['image']; break;
                default: types = ['application'];
            }

            // Process upload
            item[params.field] = await item.processFileUpload(request, types)
            if (!item[params.field]) throw new Error('Could not upload file')
            await item.save()

            // Send response
            response.send({success: true, filename: item[params.field] });
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
