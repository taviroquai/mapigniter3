const { createError } = require('apollo-errors');
const MapLayer = use('App/Models/MapLayer');

const ErrorMapLayerNotFound = createError('ErrorMapLayerNotFound', {
    message: 'MapLayer not found'
});
const ErrorInvalidMapLayer = createError('ErrorInvalidMapLayer', {
    message: 'Invalid MapLayer data'
});

const Resolver = {

    /**
     * Get map layers
     * @return {Promise} [description]
     */
    getMapLayers: async (root, args, context) => {
        const result = await MapLayer.query()
            .with('layer')
            .where('map_id', args.map_id)
            .orderBy('id', 'desc')
            .fetch()
        return result.toJSON()
    },

    /**
     * Create a new MapLayer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    addMapLayer: async (root, args, context) => {

        // Validate input
        const errors = await MapLayer.validate(args)
        if (errors) throw new ErrorInvalidMapLayer({
            message: 'Invalid MapLayer data',
            data: errors
        })

        // Save
        const data = MapLayer.filterInput(args)
        var item = await MapLayer.create(data)
        await item.save()

        // Return MapLayer
        var result = await MapLayer.query().where('id', item.id).fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Remove existing MapLayer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    removeMapLayer: async (root, args, context) => {

        // Validate MapLayer
        var item = await MapLayer.find(args.id || 0)
        if (!item) throw new ErrorMapLayerNotFound({
            message: 'Map layer not found',
            data: args
        })

        // MapLayer to be returned
        var result = await MapLayer.query().where('id', item.id).fetch()
        result = result.toJSON()

        // Remove
        await item.delete()

        // Return MapLayer
        return result[0]
    }
}

module.exports = Resolver
