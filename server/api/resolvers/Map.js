const { createError } = require('apollo-errors');
const Map = use('App/Models/Map')
const Layer = use('App/Models/Layer')

const ErrorMapNotFound = createError('ErrorMapNotFound', {
    message: 'Map not found'
});
const ErrorInvalidMap = createError('ErrorInvalidMap', {
    message: 'Invalid map data'
});

const Resolver = {
    getMaps: async () => {
        const result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('publish', true)
            .fetch()
        return result.toJSON()
    },
    getMap: async (root, args, context) => {
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
        var map = result[0]
        return map
    },
    addMap: async (root, args, context) => {

        // Validate input
        const errors = await Map.validate(args)
        if (errors) throw new ErrorInvalidMap({
            message: 'Invalid map data',
            data: errors
        })

        // Fields to save
        const data = {}
        const fields = [
            'title',
            'seo_slug',
            'projection_id',
            'coordx',
            'coordy',
            'publish',
            'description',
            'zoom'
        ].forEach(f => {
            if (Object.keys(args).indexOf(f) > -1) data[f] = args[f]
        })

        // Save
        var item = await Map.find(args.id || 0)
        if (item) item.merge(data)
        else item = await Map.create(data)
        await item.save()

        // Return map
        const result = await Map.query()
            .with('projection')
            .with('layers.layer.projection')
            .where('publish', true)
            .where('id', item.id)
            .fetch()
        return result.toJSON()[0]
    }
}

module.exports = Resolver
