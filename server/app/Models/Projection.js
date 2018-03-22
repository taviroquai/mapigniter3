'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class Projection extends Model {
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
