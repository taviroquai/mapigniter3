const { createError } = require('apollo-errors');
const Projection = use('App/Models/Projection');

const ErrorProjectionNotFound = createError('ErrorProjectionNotFound', {
    message: 'Projection not found'
});
const ErrorInvalidProjection = createError('ErrorInvalidProjection', {
    message: 'Invalid projection data'
});

const Resolver = {

    /**
     * Gel all projections
     * @return {Promise} [description]
     */
    getProjections: async () => {
        const result = await Projection.query().orderBy('id', 'desc').fetch()
        return result.toJSON()
    },

    /**
     * Get single projection
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    getProjection: async (root, args, context) => {
        var result = await Projection.query().where('id', args.id).fetch()
        result = result.toJSON()
        if (!result.length) throw new ErrorProjectionNotFound({
            message: 'Projection not found',
            data: args
        })
        return result[0]
    },

    /**
     * Create a new projection
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    addProjection: async (root, args, context) => {

        // Validate input
        const errors = await Projection.validate(args)
        if (errors) throw new ErrorInvalidProjection({
            message: 'Invalid projection data',
            data: errors
        })

        // Save
        const data = Projection.filterInput(args)
        var item = await Projection.create(data)
        await item.save()

        // Return projection
        var result = await Projection.query().where('id', item.id).fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Update existing projection
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    updateProjection: async (root, args, context) => {

        // Validate projection
        var item = await Projection.find(args.id || 0)
        if (!item) throw new ErrorProjectionNotFound({
            message: 'Projection not found',
            data: args
        })

        // Validate input
        const errors = await Projection.validate(args)
        if (errors) throw new ErrorInvalidProjection({
            message: 'Invalid projection data',
            data: errors
        })

        // Save
        const data = Projection.filterInput(args)
        item.merge(data)
        await item.save()

        // Return projection
        var result = await Projection.query().where('id', item.id).fetch()
        result = result.toJSON()
        return result[0]
    },

    /**
     * Remove existing projection
     * @param  {[type]}  root    [description]
     * @param  {[type]}  args    [description]
     * @param  {[type]}  context [description]
     * @return {Promise}         [description]
     */
    removeProjection: async (root, args, context) => {

        // Validate projection
        var item = await Projection.find(args.id || 0)
        if (!item) throw new ErrorProjectionNotFound({
            message: 'Projection not found',
            data: args
        })

        // Map to be returned
        var result = await Projection.query().where('id', item.id).fetch()
        result = result.toJSON()

        // Remove
        await item.delete()

        // Return projection
        return result[0]
    }
}

module.exports = Resolver
