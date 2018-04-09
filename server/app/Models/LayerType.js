'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class LayerType extends Model {

    static fillable() {
        return [
            'label',
            'key'
        ]
    }

    static filterInput(input) {
        const data = {}
        const fields = LayerType.fillable().forEach(f => {
            if (Object.keys(input).indexOf(f) > -1) data[f] = input[f]
        })
        return data
    }

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
