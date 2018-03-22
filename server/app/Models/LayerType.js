'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class LayerType extends Model {
    static get table () {
        return 'layertypes'
    }
    layers () {
        return this.hasMany('App/Models/Layer')
    }

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
