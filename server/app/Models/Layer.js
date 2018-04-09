'use strict'

const ps = require('child_process')
const fs = require('fs')
var gdal = require("gdal")
const Model = use('Model')
const { validate } = use('Validator')
const uuidV4 = require('uuid/v4')
const Helpers = use('Helpers')
const Env = use('Env')
const Utils = require('./Utils')

class Layer extends Model {

    static boot () {
      super.boot()

      /**
       * A hook to bash the postgis password before saving
       * it to the database.
       *
       * Look at `app/Models/Hooks/Layer.js` file to
       * check the hashPostgisPass method
       */
      this.addHook('beforeSave', 'Layer.encryptPostgisPass')
    }

    /**
     * Hide fields when exporting users
     * @type {[type]}
     */
    static get hidden () {
      return ['postgis_pass']
    }

    static fillable() {
        return [
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
        ]
    }

    static filterInput(input) {
        const data = {}
        const fields = Layer.fillable().forEach(f => {
            if (Object.keys(input).indexOf(f) > -1) data[f] = input[f]
        })
        return data
    }

    projection () {
        return this.belongsTo('App/Models/Projection')
    }

    mapLayers () {
        return this.hasMany('App/Models/MapLayer')
    }

    /**
     * Validate input
     * @param  {Object}  input The record input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            title: 'required',
            seo_slug: 'required',
            type: 'required',
            projection_id: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }

    getStoragePath() {
        return Helpers.publicPath(Env.get('PUBLIC_STORAGE')+'/layer/'+this.id);
    }

    async processFileUpload(request, field, types) {
        const target = this.getStoragePath()
        return await Utils.processFileUpload(request, types, target)
    }

    async asGeoJSON(db, query) {
        var json = {
            type: 'FeatureCollection',
            crs: {
                type: 'name',
                properties: {
                    name: 'EPSG:' + query.srs
                }
            },
            features: []
        };

        // Validate
        if (!query || !query.bbox || !query.srs) return json;

        // Build query and params
        var sql = `
            SELECT ${this.postgis_attributes},
                ST_AsGeoJSON(ST_Transform(${this.postgis_field}, ?)) as json
            FROM ${this.postgis_schema}.${this.postgis_table}
            WHERE ST_MakeEnvelope(?,?,?,?,?) && ST_Transform(${this.postgis_field}, ?)
        `;
        var params = []
        params.push(query.srs)
        query.bbox.split(',').map(i => params.push(parseFloat(i)))
        params.push(query.srs)
        params.push(query.srs)

        // Query data
        return new Promise(resolver => {
            db.raw(sql, params).then((resp) => {
                json.features = resp.rows.map(item => {
                    const geometry = JSON.parse(item.json)
                    delete item.json
                    return {
                        type: 'Feature',
                        geometry: geometry,
                        properties: item
                    }
                })
                resolver(json)
            })
            .catch(function(err) {
                console.log(err);
                resolver(false);
            });
        });
    }

    static async gdalInfo(layer) {
        return new Promise(resolver => {
            const path = layer.getStoragePath()
            var datasource = '';
            switch(layer.type) {
                case 'KML':
                    datasource = path + '/' + layer.kml_filename;
                    break;
                default:
                    return resolver('')
            }
            var dataset = gdal.open(datasource);
            var result = []
            dataset.layers.forEach(function(layer, i) {
                result.push({
                    id: i,
                    name:layer.name,
                    extent: layer.getExtent(),
                    srs: layer.srs
                    //geojson:
                })
            });
            resolver(result)
            /*
            var layer = dataset.layers.get(0);
            const cmd = 'ogrinfo ' + datasource
            ps.exec(cmd, (err, stdout, stderr) => {
                if (err) return resolver(err)
                resolver(stdout.split("\n"))
            });
            */
        })
    }

    static async gdalGeoJSON(layer, featureTypeId) {
        return new Promise(resolver => {
            const path = layer.getStoragePath()
            const filename = layer.getStoragePath()+'/out.json'
            if (fs.existsSync(filename)) {
                const content = fs.readFileSync(filename, 'utf8')
                return resolver(content)
            }
            var datasource = '';
            switch(layer.type) {
                case 'KML':
                    datasource = path + '/' + layer.kml_filename;
                    break;
                default:
                    return resolver('')
            }
            var name, dataset = gdal.open(datasource);
            dataset.layers.forEach(function(layer, i) {
                if (i === featureTypeId) name = layer.name
            });
            /*
            var driver, dataset = gdal.open(datasource);
            gdal.drivers.forEach(drv => {
                console.log(drv.description)
                if (/geojson/i.test(drv.description)) driver = drv
            })
            const output = driver.createCopy(filename, dataset)
            output.flush()
            output.close()
            resolver(fs.readFileSync(filename, 'utf8'))
            */
            const cmd = 'ogr2ogr -f "GeoJSON" ' + filename + ' ' + datasource + ' ' + name
            ps.exec(cmd, (err, stdout, stderr) => {
                if (err) return resolver(err)
                resolver(fs.readFileSync(filename, 'utf8'))
            });
        })
    }

}

module.exports = Layer
