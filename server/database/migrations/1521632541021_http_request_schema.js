'use strict'

const Schema = use('Schema')

class HttpRequestSchema extends Schema {
    up () {
        this.create('http_requests', (table) => {
            table.increments()
            table.timestamps()
            table.integer('map_id').unsigned().nullable();
            table.integer('user_id').unsigned().nullable();
            table.text('http_url');
            table.string('http_method');
            table.string('http_path');
            table.string('ip');
            table.foreign('map_id').references('maps.id')
                .onUpdate('cascade').onDelete('cascade');
            table.foreign('user_id').references('users.id')
                .onUpdate('cascade').onDelete('cascade');
        })
    }

    down () {
        this.drop('http_requests')
    }
}

module.exports = HttpRequestSchema
