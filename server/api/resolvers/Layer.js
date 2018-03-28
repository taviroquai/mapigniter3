const { createError } = require('apollo-errors')
const Layer = use('App/Models/Layer')

const ErrorLayerNotFound = createError('ErrorLayerNotFound', {
    message: 'Layer not found'
});

const Resolver = {
    getLayers: async () => {
        const result = await Layer.query()
            .with('projection')
            .where('publish', true)
            .fetch()
        return result.toJSON()
    },
    getLayer: async (root, args, context) => {
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
    }
}

module.exports = Resolver
