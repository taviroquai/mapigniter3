const Map = require('./Map')
const Layer = require('./Layer')
const Projection = require('./Projection')
const LayerType = require('./LayerType')
const MapLayer = require('./MapLayer')

const PublicResolvers = {
    Query: {
        maps: async () => {
            return await Map.getPublishedMaps()
        },
        map: async (root, args, context) => {
            return await Map.getPublishedMap(root, args, context)
        },
        layers: async () => {
            return await Layer.getLayers()
        },
        layer: async (root, args, context) => {
            return await Layer.getLayer(root, args, context)
        }
    },
}

const AdminResolvers = {
    Mutation: {
        addMap: async (root, args, context) => {
            return await Map.addMap(root, args, context)
        },
        updateMap: async (root, args, context) => {
            return await Map.updateMap(root, args, context)
        },
        removeMap: async (root, args, context) => {
            return await Map.removeMap(root, args, context)
        },
        addProjection: async (root, args, context) => {
            return await Projection.addProjection(root, args, context)
        },
        updateProjection: async (root, args, context) => {
            return await Projection.updateProjection(root, args, context)
        },
        removeProjection: async (root, args, context) => {
            return await Projection.removeProjection(root, args, context)
        },
        addLayerType: async (root, args, context) => {
            return await LayerType.addLayerType(root, args, context)
        },
        updateLayerType: async (root, args, context) => {
            return await LayerType.updateLayerType(root, args, context)
        },
        removeLayerType: async (root, args, context) => {
            return await LayerType.removeLayerType(root, args, context)
        },
        addMapLayer: async (root, args, context) => {
            return await MapLayer.addMapLayer(root, args, context)
        },
        removeMapLayer: async (root, args, context) => {
            return await MapLayer.removeMapLayer(root, args, context)
        },
        addLayer: async (root, args, context) => {
            return await Layer.addLayer(root, args, context)
        },
        updateLayer: async (root, args, context) => {
            return await Layer.updateLayer(root, args, context)
        },
        removeLayer: async (root, args, context) => {
            return await Layer.removeLayer(root, args, context)
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
        },
        mapLayers: async (root, args, context) => {
            return await MapLayer.getMapLayers(root, args, context)
        },
        projections: async () => {
            return await Projection.getProjections()
        },
        projection: async (root, args, context) => {
            return await Projection.getProjection(root, args, context)
        },
        layerTypes: async () => {
            return await LayerType.getLayerTypes()
        },
        layerType: async (root, args, context) => {
            return await LayerType.getLayerType(root, args, context)
        },
        getStats: async (root, args, context) => {
            return await Map.getStats(root, args, context)
        }
    },
}

module.exports = {PublicResolvers, AdminResolvers}
