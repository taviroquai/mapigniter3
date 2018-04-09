import gql from 'graphql-tag'

export const getAllLayers = gql`
{
    layers {
        id
        title
    }
}`

export const getLayerById = gql`
query getLayer($id: ID!) {
    layer(id: $id) {
        id
        title
        description
        type
        seo_slug
        publish
        image
        projection_id
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
}`

export const addLayer = gql`
mutation addLayer(
    $title: String!
    $projection_id: Int!
    $publish: Boolean!
    $seo_slug: String!
    $description: String
    $type: String
    $feature_info_template: String
    $search: String
    $min_resolution: String
    $max_resolution: String
    $bing_key: String
    $bing_imageryset: String
    $gpx_filename: String
    $mapquest_layer: String
    $kml_filename: String
    $geopackage_filename: String
    $geopackage_table: String
    $geopackage_fields: String
    $geojson_geomtype: String
    $geojson_attributes: String
    $geojson_features: String
    $postgis_host: String
    $postgis_port: String
    $postgis_user: String
    $postgis_dbname: String
    $postgis_schema: String
    $postgis_table: String
    $postgis_field: String
    $postgis_attributes: String
    $wms_url: String
    $wms_version: String
    $wms_servertype: String
    $wms_tiled: Boolean
    $wfs_url: String
    $wfs_version: String
    $wms_layers: String
    $wfs_typename: String
) {
    addLayer(
        title: $title
        projection_id: $projection_id
        publish: $publish
        description: $description
        seo_slug: $seo_slug
        type: $type
        feature_info_template: $feature_info_template
        search: $search
        min_resolution: $min_resolution
        max_resolution: $max_resolution
        bing_key: $bing_key
        bing_imageryset: $bing_imageryset
        mapquest_layer: $mapquest_layer
        gpx_filename: $gpx_filename
        kml_filename: $kml_filename
        geopackage_filename: $geopackage_filename
        geopackage_table: $geopackage_table
        geopackage_fields: $geopackage_fields
        geojson_geomtype: $geojson_geomtype
        geojson_attributes: $geojson_attributes
        geojson_features: $geojson_features
        postgis_host: $postgis_host
        postgis_port: $postgis_port
        postgis_user: $postgis_user
        postgis_dbname: $postgis_dbname
        postgis_schema: $postgis_schema
        postgis_table: $postgis_table
        postgis_field: $postgis_field
        postgis_attributes: $postgis_attributes
        wms_url: $wms_url
        wms_version: $wms_version
        wms_servertype: $wms_servertype
        wms_tiled: $wms_tiled
        wms_layers: $wms_layers
        wfs_url: $wfs_url
        wfs_version: $wfs_version
        wfs_typename: $wfs_typename
    ) {
        id
        title
        seo_slug
        projection_id
        publish
        image
        description
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
    }
}`

export const updateLayer = gql`
mutation updateLayer(
    $id: ID!
    $title: String!
    $description: String
    $projection_id: Int!
    $publish: Boolean!
    $image: String
    $seo_slug: String!
    $type: String
    $feature_info_template: String
    $search: String
    $min_resolution: String
    $max_resolution: String
    $bing_key: String
    $bing_imageryset: String
    $gpx_filename: String
    $mapquest_layer: String
    $kml_filename: String
    $geopackage_filename: String
    $geopackage_table: String
    $geopackage_fields: String
    $geojson_geomtype: String
    $geojson_attributes: String
    $geojson_features: String
    $postgis_host: String
    $postgis_port: String
    $postgis_user: String
    $postgis_dbname: String
    $postgis_schema: String
    $postgis_table: String
    $postgis_field: String
    $postgis_attributes: String
    $wms_url: String
    $wms_version: String
    $wms_servertype: String
    $wms_tiled: Boolean
    $wfs_url: String
    $wfs_version: String
    $wms_layers: String
    $wfs_typename: String
) {
    updateLayer(
        id: $id
        title: $title
        projection_id: $projection_id
        publish: $publish
        description: $description
        image: $image
        seo_slug: $seo_slug
        type: $type
        feature_info_template: $feature_info_template
        search: $search
        min_resolution: $min_resolution
        max_resolution: $max_resolution
        bing_key: $bing_key
        bing_imageryset: $bing_imageryset
        mapquest_layer: $mapquest_layer
        gpx_filename: $gpx_filename
        kml_filename: $kml_filename
        geopackage_filename: $geopackage_filename
        geopackage_table: $geopackage_table
        geopackage_fields: $geopackage_fields
        geojson_geomtype: $geojson_geomtype
        geojson_attributes: $geojson_attributes
        geojson_features: $geojson_features
        postgis_host: $postgis_host
        postgis_port: $postgis_port
        postgis_user: $postgis_user
        postgis_dbname: $postgis_dbname
        postgis_schema: $postgis_schema
        postgis_table: $postgis_table
        postgis_field: $postgis_field
        postgis_attributes: $postgis_attributes
        wms_url: $wms_url
        wms_version: $wms_version
        wms_servertype: $wms_servertype
        wms_tiled: $wms_tiled
        wms_layers: $wms_layers
        wfs_url: $wfs_url
        wfs_version: $wfs_version
        wfs_typename: $wfs_typename
    ) {
        id
        title
        projection_id
        publish
        description
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
    }
}`

export const removeLayer = gql`
mutation removeLayer($id: ID!) {
    removeLayer(id: $id) {
        id
    }
}`
