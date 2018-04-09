const { createError } = require('apollo-errors');
const LayerType = use('App/Models/LayerType');

const ErrorLayerTypeNotFound = createError('ErrorLayerTypeNotFound', {
    message: 'Layer type not found'
});
const ErrorInvalidLayerType = createError('ErrorInvalidLayerType', {
    message: 'Invalid layer type data'
});

const Resolver = {

    /**
     * Gel all LayerTypes
     * @return {Promise} [description]
     */
    getLayerTypes: async () => {
        const result = await LayerType.query().orderBy('id', 'desc').fetch()
        return result.toJSON()
    },

    /**
     * Get single LayerType
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getLayerType: async (root, args, context) => {
        var result = await LayerType.query().where('id', args.id).fetch()
        result = result.toJSON()
        if (!result.length) throw new ErrorLayerTypeNotFound({
            message: 'Layer type not found',
            data: args
        })
        return result[0]
    },

    /**
     * Create a new LayerType
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    addLayerType: async (root, args, context) => {

        // Validate input
        const errors = await LayerType.validate(args)
        if (errors) throw new ErrorInvalidLayerType({
            message: 'Invalid layer type data',
            data: errors
        })

        // Save
        const data = LayerType.filterInput(args)
        var item = await LayerType.create(data)
        await item.save()

        // Return LayerType
        var result = await LayerType.query().where('id', item.id).fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Update existing LayerType
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    updateLayerType: async (root, args, context) => {

        // Validate LayerType
        var item = await LayerType.find(args.id || 0)
        if (!item) throw new ErrorLayerTypeNotFound({
            message: 'Layer type not found',
            data: args
        })

        // Validate input
        const errors = await LayerType.validate(args)
        if (errors) throw new ErrorInvalidLayerType({
            message: 'Invalid layer type data',
            data: errors
        })

        // Save
        const data = LayerType.filterInput(args)
        item.merge(data)
        await item.save()

        // Return LayerType
        var result = await LayerType.query().where('id', item.id).fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Remove existing LayerType
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    removeLayerType: async (root, args, context) => {

        // Validate LayerType
        var item = await LayerType.find(args.id || 0)
        if (!item) throw new ErrorMapNotFound({
            message: 'Layer type not found',
            data: args
        })

        // Map to be returned
        var result = await LayerType.query().where('id', item.id).fetch()
        result = result.toJSON()

        // Remove
        await item.delete()

        // Return LayerType
        return result[0]
    }
}

module.exports = Resolver
