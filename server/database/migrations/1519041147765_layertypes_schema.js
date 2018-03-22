'use strict'

const Schema = use('Schema')

class LayertypesSchema extends Schema {
    up () {
        this.create('layertypes', (table) => {
            table.increments()
            table.string('label')
            table.string('key')
            table.integer('display_order')
            table.timestamps()
        })
    }

    down () {
        this.drop('layertypes')
    }
}

module.exports = LayertypesSchema
