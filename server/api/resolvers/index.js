const Map = require('./Map')
const Layer = require('./Layer')

const Resolvers = {
    Mutation: {
        addMap: async (root, args, context) => {
            return await Map.addMap(root, args, context)
        }
    },
    Query: {
        maps: async () => {
            return await Map.getMaps()
        },
        map: async (root, args, context) => {
            return await Map.getMap(root, args, context)
        },
        layers: async () => {
            return await Layer.getLayers()
        },
        layer: async (root, args, context) => {
            return await Layer.getLayer(root, args, context)
        }
    },
}

module.exports = Resolvers
