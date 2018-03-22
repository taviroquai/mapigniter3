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
const Projection = use('App/Models/Projection')

class LayerTypeSeeder {
    async run () {
        //await Database.truncate('projections')
        await Projection.create({
            srid: 3857,
            extent: '-20026376.39 -20048966.10 20026376.39 20048966.10',
            proj4_params: '+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs'
        })
    }
}

module.exports = LayerTypeSeeder
