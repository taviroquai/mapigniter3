'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class Projection extends Model {

    static fillable() {
        return [
            'srid',
            'proj4_params',
            'extent'
        ]
    }

    static filterInput(input) {
        const data = {}
        const fields = Projection.fillable().forEach(f => {
            if (Object.keys(input).indexOf(f) > -1) data[f] = input[f]
        })
        return data
    }

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
