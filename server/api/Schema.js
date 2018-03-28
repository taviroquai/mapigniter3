const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('./resolvers')

// The GraphQL schema in string form
const typeDefs = `
    scalar Upload
    type Query {
        maps: [Map]
        map(id: ID!): Map
        layers: [Layer]
        layer(id: ID!, featureTypeId: Int): Layer
    }
    type Mutation {
        addMap(title: String!, publish: Boolean!, seo_slug: String!, projection_id: Int!, description: String, coordx: Float, coordy: Float, zoom: Int, id: ID): Map
        addMapImage (file: Upload!): File!
    }
    type Map {
        id: ID!
        title: String
        publish: Boolean
        description: String
        seo_slug: String
        image: String
        coordx: Float
        coordy: Float
        zoom: Int
        projection_id: Int
        layers: [MapLayer]
        projection: Projection
    }
    type Projection { id: ID!, srid: Int }
    type MapLayer {
        id: ID!
        map_id: Int
        layer_id: Int
        parent_id: Int
        visible: Boolean
        display_order: Int
        baselayer: Boolean
        layer: Layer
    }
    type Layer {
        id: ID!
        title: String
        description: String
        image: String
        type: String
        seo_slug: String
        publish: Boolean
        feature_info_template: String
        search: String
        min_resolution: String
        max_resolution: String
        bing_key: String
        bing_imageryset: String
        mapquest_layer: String
        gpx_filename: String
        kml_filename: String
        geopackage_filename: String
        geopackage_table: String
        geopackage_fields: String
        geojson_geomtype: String
        geojson_attributes: String
        geojson_features: String
        postgis_host: String
        postgis_port: String
        postgis_user: String
        postgis_dbname: String
        postgis_schema: String
        postgis_table: String
        postgis_field: String
        postgis_attributes: String
        wms_url: String
        wms_version: String
        wms_servertype: String
        wms_tiled: String
        wms_layers: String
        wfs_url: String
        wfs_version: String
        wfs_typename: String
        projection: Projection
        featureTypes: [FeatureType]
        geojson: String
    }
    type FeatureType {
        id: ID!
        name: String
        extent: Extent
        srs: String
        geojson: String
    }
    type Extent {
        minX: Float
        minY: Float
        maxX: Float
        maxY: Float
    }
    type File {
        id: ID!
        path: String!
        filename: String!
        mimetype: String!
        encoding: String!
    }
`

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema
