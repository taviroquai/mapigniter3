'use strict'

const Schema = use('Schema')

class MapLayerSchema extends Schema {
    up () {
        this.create('map_layers', (table) => {
            table.increments()
            table.timestamps()
            table.integer('parent_id').unsigned();
            table.integer('layer_id').unsigned();
            table.integer('map_id').unsigned();
            table.boolean('visible');
            table.integer('display_order').unsigned();
            table.boolean('baselayer').nullable();
            table.foreign('layer_id').references('layers.id').onDelete('cascade');
            table.foreign('map_id').references('maps.id').onDelete('cascade');
        })
    }

    down () {
        this.drop('map_layers')
    }
}

module.exports = MapLayerSchema
