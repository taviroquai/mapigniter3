const { createError } = require('apollo-errors');
const Map = use('App/Models/Map');
const Layer = use('App/Models/Layer');
const MapLayer = use('App/Models/MapLayer');

/**
 * Error map not found
 * @type {[type]}
 */
const ErrorMapNotFound = createError('ErrorMapNotFound', {
    message: 'Map not found'
});

/**
 * Error invalid map data
 * @type {[type]}
 */
const ErrorInvalidMap = createError('ErrorInvalidMap', {
    message: 'Invalid map data'
});

const Resolver = {

    /**
     * Get published maps
     * @return {Promise} [description]
     */
    getPublishedMaps: async () => {
        const result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('publish', true)
            .orderBy('id', 'desc')
            .fetch()
        return result.toJSON()
    },

    /**
     * Get single published map
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getPublishedMap: async (root, args, context) => {
        var result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('publish', true)
            .where('id', args.id)
            .fetch()
        result = result.toJSON()
        if (!result.length) throw new ErrorMapNotFound({
            message: 'Map not found',
            data: args
        })
        return result[0]
    },

    /**
     * Gel all maps
     * @return {Promise} [description]
     */
    getMaps: async () => {
        const result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .orderBy('id', 'desc')
            .fetch()
        return result.toJSON()
    },

    /**
     * Get single map
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getMap: async (root, args, context) => {
        var result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('id', args.id)
            .fetch()
        result = result.toJSON()
        if (!result.length) throw new ErrorMapNotFound({
            message: 'Map not found',
            data: args
        })
        return result[0]
    },

    /**
     * Create a new map
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    addMap: async (root, args, context) => {

        // Validate input
        const errors = await Map.validate(args)
        if (errors) throw new ErrorInvalidMap({
            message: 'Invalid map data',
            data: errors
        })

        // Save
        const data = Map.filterInput(args)
        var item = await Map.create(data)
        await item.save()

        // Return map
        var result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Update single map
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    updateMap: async (root, args, context) => {

        // Validate map
        var item = await Map.find(args.id || 0)
        if (!item) throw new ErrorMapNotFound({
            message: 'Map not found',
            data: args
        })

        // Validate input
        const errors = await Map.validate(args)
        if (errors) throw new ErrorInvalidMap({
            message: 'Invalid map data',
            data: errors
        })

        // Save
        const data = Map.filterInput(args)
        item.merge(data)
        await item.save()

        // Return map
        var result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Remove single map
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    removeMap: async (root, args, context) => {

        // Validate map
        var item = await Map.find(args.id || 0)
        if (!item) throw new ErrorMapNotFound({
            message: 'Map not found',
            data: args
        })

        // Map to be returned
        var result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('id', item.id)
            .fetch()
        result = result.toJSON()

        // Remove
        await item.delete()

        // Return map
        return result[0]
    },

    /**
     * Get map stats
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getStats: async (root, args, context) => {
        const stats = {
            stats1: Map.getDashboardActivity()
        }
        return stats
    }
}

module.exports = Resolver
