import gql from 'graphql-tag'

export const getAllProjections = gql`
{
    projections {
        id
        srid
    }
}`

export const getProjectionById = gql`
query getProjection($id: ID!) {
    projection(id: $id) {
        id
        srid
        proj4_params
        extent
    }
}`

export const updateProjection = gql`
mutation updateProjection($id: ID!, $srid: Int!, $proj4_params: String!, $extent: String!) {
    updateProjection(id: $id, srid: $srid, proj4_params: $proj4_params, extent: $extent) {
        id
        srid
        proj4_params
        extent
    }
}`

export const addProjection = gql`
mutation addProjection($srid: Int!, $proj4_params: String!, $extent: String!) {
    addProjection(srid: $srid, proj4_params: $proj4_params, extent: $extent) {
        id
        srid
        proj4_params
        extent
    }
}`

export const removeProjection = gql`
mutation removeProjection($id: ID!) {
    removeProjection(id: $id) {
        id
    }
}`
