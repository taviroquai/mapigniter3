'use strict'

const Schema = use('Schema')

class MapsSchema extends Schema {
    up () {
        this.create('maps', (table) => {
            table.increments()
            table.integer('user_id').unsigned();
            table.string('title');
            table.string('seo_slug');
            table.float('coordx', 16, 8);
            table.float('coordy', 16, 8);
            table.integer('zoom');
            table.foreign('user_id').references('users.id').onDelete('cascade')
            table.integer('projection_id').unsigned()
            table.foreign('projection_id').references('projections.id').onDelete('cascade')
            table.timestamps()
        })
    }

    down () {
        this.drop('maps')
    }
}

module.exports = MapsSchema
