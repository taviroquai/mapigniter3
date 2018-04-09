'use strict'

const Model = use('Model')
const { validate } = use('Validator')
const pick = require('lodash.pick')

class LayerType extends Model {

    /**
     * The fillable attributes
     * @return {Array} The list of attributes
     */
    static fillable() {
        return [
            'label',
            'key'
        ]
    }

    /**
     * Filter input data
     * @param  {Object} input The user input
     * @return {Object}       the user input filtered
     */
    static filterInput(input) {
        const data = pick(input, LayerType.fillable())
        return data
    }

    /**
     * Get ORM database table
     * @type {Object}
     */
    static get table () {
        return 'layertypes'
    }

    /**
     * ORM layers relationship
     * @return {[type]} [description]
     */
    layers () {
        return this.hasMany('App/Models/Layer')
    }

    /**
     * Validate user input
     * @param  {Object}  input the user input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            label: 'required',
            key: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }
}

module.exports = LayerType
