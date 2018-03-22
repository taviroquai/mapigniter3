'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class MapLayer extends Model {
    static get table () {
        return 'map_layers'
    }
    map () {
        return this.belongsTo('App/Models/Map')
    }
    layer () {
        return this.belongsTo('App/Models/Layer')
    }

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
