import gql from 'graphql-tag'

export const getAllLayerTypes = gql`
{
    layerTypes {
        id
        label
        key
    }
}`

export const getLayerTypeById = gql`
query getLayerType($id: ID!) {
    layerType(id: $id) {
        id
        label
        key
    }
}`

export const updateLayerType = gql`
mutation updateLayerType($id: ID!, $label: String!, $key: String!) {
    updateLayerType(id: $id, label: $label, key: $key) {
        id
        label
        key
    }
}`

export const addLayerType = gql`
mutation addLayerType($label: String!, $key: String!) {
    addLayerType(label: $label, key: $key) {
        id
        label
        key
    }
}`

export const removeLayerType = gql`
mutation removeLayerType($id: ID!) {
    removeLayerType(id: $id) {
        id
    }
}`
