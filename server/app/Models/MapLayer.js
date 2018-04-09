'use strict'

const Model = use('Model')
const { validate } = use('Validator')
const pick = require('lodash.pick')

class MapLayer extends Model {

    /**
     * Get the ORM table name
     * @type {String}
     */
    static get table () {
        return 'map_layers'
    }

    /**
     * Get fillable attributes
     * @return {[type]} [description]
     */
    static fillable() {
        return [
            'map_id',
            'layer_id',
            'parent_id',
            'visible',
            'display_order',
            'baselayer'
        ]
    }

    /**
     * Filter user input
     * @param  {Object} input The user input
     * @return {Object}       the user input filtered
     */
    static filterInput(input) {
        const data = pick(input, MapLayer.fillable())
        data.parent_id = data.parent_id ? data.parent_id : null
        return data
    }

    /**
     * Map ORM relationship
     * @return {Object} The ORM relationship
     */
    map () {
        return this.belongsTo('App/Models/Map')
    }

    /**
     * Layer ORM relationship
     * @return {Object} The ORM relationship
     */
    layer () {
        return this.belongsTo('App/Models/Layer')
    }

    /**
     * Validate user input
     * @param  {Object}  input The user input
     * @return {Promise}
     */
    static async validate(input) {
        const rules = {
            map_id: 'required',
            layer_id: 'required',
            visible: 'required',
            baselayer: 'required'
        }
        const validation = await validate(input, rules)
        return validation.fails() ? validation.messages() : false
    }
}

module.exports = MapLayer
