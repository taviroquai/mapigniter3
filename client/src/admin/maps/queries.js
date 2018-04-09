import gql from 'graphql-tag'

export const getAllMaps = gql`
{
    maps {
        id
        title
    }
}`

export const getMapById = gql`
query getMap($id: ID!) {
    map(id: $id) {
        id
        title
        seo_slug
        description
        image
        publish
        coordx
        coordy
        zoom
        projection_id
        projection {
            srid
        }
        layers {
            id
            parent_id
            map_id
            layer_id
            visible
            display_order
            baselayer
            layer {
                id
                title
                description
                type
                seo_slug
                publish
                image
                feature_info_template
                search
                min_resolution
                max_resolution
                bing_key
                bing_imageryset
                mapquest_layer
                gpx_filename
                kml_filename
                geopackage_filename
                geopackage_table
                geopackage_fields
                geojson_geomtype
                geojson_attributes
                geojson_features
                postgis_host
                postgis_port
                postgis_user
                postgis_dbname
                postgis_schema
                postgis_table
                postgis_field
                postgis_attributes
                wms_url
                wms_version
                wms_servertype
                wms_tiled
                wms_layers
                wfs_url
                wfs_version
                wfs_typename
                projection {
                    id
                    srid
                }
            }
        }
    }
}`

export const updateMap = gql`
mutation updateMap(
    $id: ID!
    $title: String!
    $seo_slug: String!
    $projection_id: Int!
    $publish: Boolean!
    $description: String
    $image: String
    $coordx: Float
    $coordy: Float
    $zoom: Int
) {
    updateMap(
        id: $id
        title: $title
        seo_slug: $seo_slug
        projection_id: $projection_id
        publish: $publish
        description: $description
        image: $image
        coordx: $coordx
        coordy: $coordy
        zoom: $zoom
    ) {
        id
        title
        seo_slug
        projection_id
        coordx
        coordy
        publish
        description
        zoom
        image
    }
}`

export const addMap = gql`
mutation addMap(
    $title: String!,
    $seo_slug: String!,
    $projection_id: Int!,
    $publish: Boolean!,
    $description: String,
    $coordx: Float,
    $coordy: Float,
    $zoom: Int
) {
    addMap(
        title: $title,
        seo_slug: $seo_slug,
        projection_id: $projection_id,
        publish: $publish,
        description: $description,
        coordx: $coordx,
        coordy: $coordy,
        zoom: $zoom
    ) {
        id
        title
        seo_slug
        projection_id
        coordx
        coordy
        publish
        description
        zoom
    }
}`

export const removeMap = gql`
mutation removeMap($id: ID!) {
    removeMap(id: $id) {
        id
    }
}`
