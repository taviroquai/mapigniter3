'use strict'

const Schema = use('Schema')

class LayersSchema extends Schema {
    up () {
        this.table('layers', (table) => {
            table.boolean('publish').default(true);
            table.string('image');
            table.text('description');
        })
    }

    down () {
        this.table('layers', (table) => {
            table.dropColumn('publish');
            table.dropColumn('image');
            table.dropColumn('description');
        })
    }
}

module.exports = LayersSchema
