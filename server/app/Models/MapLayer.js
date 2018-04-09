'use strict'

const Model = use('Model')
const { validate } = use('Validator')

class MapLayer extends Model {

    static get table () {
        return 'map_layers'
    }

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

    static filterInput(input) {
        const data = {}
        const fields = MapLayer.fillable().forEach(f => {
            if (Object.keys(input).indexOf(f) > -1) data[f] = input[f]
        })
        data.parent_id = data.parent_id ? data.parent_id : null
        return data
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
