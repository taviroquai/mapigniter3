'use strict'

const Schema = use('Schema')

class ProjectionsSchema extends Schema {
    up () {
        this.create('projections', (table) => {
            table.increments()
            table.integer('srid').unique().unsigned()
            table.text('proj4_params')
            table.string('extent')
            table.timestamps()
        })
    }

    down () {
        this.drop('projections')
    }
}

module.exports = ProjectionsSchema
