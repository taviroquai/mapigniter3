'use strict'

const Model = use('Model')
const { validate } = use('Validator')
const pick = require('lodash.pick')

class Projection extends Model {

    /**
     * Get fillable attributes
     * @return {[type]} [description]
     */
    static fillable() {
        return [
            'srid',
            'proj4_params',
            'extent'
        ]
    }

    /**
     * Filter user input
     * @param  {Object} input The user input
     * @return {Object}       the user input filtered
     */
    static filterInput(input) {
        const data = pick(input, Projection.fillable())
        return data
    }

    /**
     * Layers ORM relationship
     * @return {Object} The ORM relationship
     */
    layers () {
        return this.hasMany('App/Models/Layer')
    }

    /**
     * Validate input
     * @param  {Object}  input The record input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            srid: 'required|integer',
            extent: 'regex:^(\\-?\\d+\\.\\d+)\\s(\\-?\\d+\\.\\d+)\\s(\\-?\\d+\\.\\d+)\\s(\\-?\\d+\\.\\d+)$',
            proj4_params: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }
}

module.exports = Projection
