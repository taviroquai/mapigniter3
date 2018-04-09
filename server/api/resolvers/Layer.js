const { createError } = require('apollo-errors')
const Layer = use('App/Models/Layer')

const ErrorLayerNotFound = createError('ErrorLayerNotFound', {
    message: 'Layer not found'
});

const ErrorInvalidLayer = createError('ErrorInvalidLayer', {
    message: 'Invalid layer data'
});

const Resolver = {

    /**
     * Get published layers
     * @return {Promise} [description]
     */
    getPublishedLayers: async () => {
        const result = await Layer.query()
            .with('projection')
            .where('publish', true)
            .orderBy('id', 'desc')
            .fetch()
        return result.toJSON()
    },

    /**
     * Get single published layer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getPublishedLayer: async (root, args, context) => {
        var result = await Layer.query()
            .with('projection')
            .where('publish', true)
            .where('id', args.id)
            .fetch()
        result = result.toJSON()
        if (!result.length) throw new ErrorLayerNotFound({
            message: 'Layer not found',
            data: args
        })
        var layer = result[0]
        if (typeof args.featureTypeId !== 'undefined') {
            layer.geojson = await layer.gdalGeoJSON(args.featureTypeId)
        }
        else layer.featureTypes = await layer.gdalInfo()
        return layer
    },

    /**
     * Get all layers
     * @return {Promise} [description]
     */
    getLayers: async () => {
        const result = await Layer.query()
            .with('projection')
            .orderBy('id', 'desc')
            .fetch()
        return result.toJSON()
    },

    /**
     * Get single layer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getLayer: async (root, args, context) => {
        var result = await Layer.find(args.id)
        if (!result) throw new ErrorLayerNotFound({
            message: 'Layer not found',
            data: args
        })
        result = await Layer.query()
            .with('projection')
            .where('id', args.id)
            .fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Create a new layer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    addLayer: async (root, args, context) => {

        // Validate input
        const errors = await Layer.validate(args)
        if (errors) throw new ErrorInvalidLayer({
            message: 'Invalid layer data',
            data: errors
        })

        // Save
        const data = Layer.filterInput(args)
        var item = await Layer.create(data)
        await item.save()

        // Return layer
        var result = await Layer.query()
            .with('projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Update layer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    updateLayer: async (root, args, context) => {

        // Validate layer
        var item = await Layer.find(args.id)
        if (!item) throw new ErrorLayerNotFound({
            message: 'Layer not found',
            data: args
        })

        // Validate input
        const errors = await Layer.validate(args)
        if (errors) throw new ErrorInvalidLayer({
            message: 'Invalid layer data',
            data: errors
        })

        // Save
        const data = Layer.filterInput(args)
        item.merge(data)
        await item.save()

        // Return layer
        var result = await Layer.query()
            .with('projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()
        console.log(result[0])
        return result[0]
    },

    /**
     * Remove single layer
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    removeLayer: async (root, args, context) => {

        // Validate layer
        var item = await Layer.find(args.id || 0)
        if (!item) throw new ErrorLayerNotFound({
            message: 'Layer not found',
            data: args
        })

        // Layer to be returned
        var result = await Layer.query()
            .with('projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()

        // Remove
        await item.delete()

        // Return layer
        return result[0]
    }
}

module.exports = Resolver
