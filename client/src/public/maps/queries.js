import gql from 'graphql-tag'

export const getLayerById = gql`
query getMap($id: ID!) {
    map(id: $id) {
        id
        title
        seo_slug
        description
        image
        coordx
        coordy
        zoom
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
