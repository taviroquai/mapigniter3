'use strict'

/*
|--------------------------------------------------------------------------
| todoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database')
const LayerType = use('App/Models/LayerType')

class LayerTypeSeeder {
    async run () {
        await Database.truncate('layertypes')
        await LayerType.create({key: 'GROUP', label: 'Group'})
        await LayerType.create({key: 'BING', label: 'Bing'})
        await LayerType.create({key: 'OSM', label: 'Open Street Map'})
        await LayerType.create({key: 'WMS', label: 'Tiled WMS'})
        await LayerType.create({key: 'WFS', label: 'WFS'})
        await LayerType.create({key: 'GPX', label: 'GPX File'})
        await LayerType.create({key: 'KML', label: 'KML File'})
        await LayerType.create({key: 'POSTGIS', label: 'PostGIS table/view'})
        await LayerType.create({key: 'GEOJSON', label: 'GeoJSON File'})
        await LayerType.create({key: 'GEOPACKAGE', label: 'GeoPackage File'})
    }
}

module.exports = LayerTypeSeeder
