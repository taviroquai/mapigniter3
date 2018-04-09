import gql from 'graphql-tag'

export const addMapLayer = gql`
mutation addMapLayer($map_id: Int!, $layer_id: Int!, $parent_id: String, $visible: Boolean!, $display_order: Int!, $baselayer: Boolean!) {
    addMapLayer(map_id: $map_id, layer_id: $layer_id, parent_id: $parent_id, visible: $visible, display_order: $display_order, baselayer: $baselayer) {
        id
        map_id
        layer_id
        parent_id
        visible
        display_order
        baselayer
    }
}`

export const getMapLayersByMapId = gql`
query getMapLayers($map_id: ID!) {
    mapLayers(map_id: $map_id) {
        id
        layer {
            id
            title
            type
        }
    }
}`

export const removeMapLayer = gql`
mutation removeMapLayer($id: ID!) {
    removeMapLayer(id: $id) {
        id
    }
}`
