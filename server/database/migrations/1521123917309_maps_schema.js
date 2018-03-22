'use strict'

const Schema = use('Schema')

class MapsSchema extends Schema {
    up () {
        this.table('maps', (table) => {
            table.boolean('publish').default(true);
            table.string('image');
            table.text('description');
        })
    }

    down () {
        this.table('maps', (table) => {
            table.dropColumn('publish');
            table.dropColumn('image');
            table.dropColumn('description');
        })
    }
}

module.exports = MapsSchema
