const { makeExecutableSchema } = require('graphql-tools');
const Map = use('App/Models/Map')
const Layer = use('App/Models/Layer')

// The GraphQL schema in string form
const typeDefs = `
    type Query {
        maps: [Map],
        layers: [Layer],
        layer(id: ID!, featureTypeId: Int): Layer
    }
    type Map {
        id: ID!,
        title: String,
        description: String,
        layers: [MapLayer],
        projection: Projection
    }
    type Projection { id: ID!, srid: Int }
    type MapLayer { id: ID!, layer: Layer }
    type Layer {
        id: ID!,
        title: String,
        description: String,
        type: String,
        projection: Projection,
        featureTypes: [FeatureType],
        geojson: String
    }
    type FeatureType {
        id: ID!,
        name: String,
        extent: Extent,
        srs: String,
        geojson: String
    }
    type Extent {
        minX: Float,
        minY: Float,
        maxX: Float,
        maxY: Float
    }
`;

// The resolvers
const resolvers = {
    Query: {
        maps: async () => {
            const result = await Map.query()
                .with('projection')
                .with('layers.layer.projection')
                .where('publish', true)
                .fetch()
            return result.toJSON()
        },
        layers: async () => {
            const result = await Layer.query()
                .with('projection')
                .where('publish', true)
                .fetch()
            return result.toJSON()
        },
        layer: async (root, args, context) => {
            var layer = await Layer.query()
                .with('projection')
                .where('publish', true)
                .where('id', args.id)
                .first()
            if (typeof args.featureTypeId !== 'undefined') {
                layer.geojson = await layer.gdalGeoJSON(args.featureTypeId)
            }
            else layer.featureTypes = await layer.gdalInfo()
            return layer
        }
    },
};

// Put together a schema
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema
