'use strict'

const Schema = use('Schema')

class LayersSchema extends Schema {
    up () {
        this.table('layers', (table) => {
            table.string('min_resolution').nullable();
            table.string('max_resolution').nullable();
        })
    }

    down () {
        this.table('layers', (table) => {
            table.dropColumn('min_resolution');
            table.dropColumn('max_resolution');
        })
    }
}

module.exports = LayersSchema
