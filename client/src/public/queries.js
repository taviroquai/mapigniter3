import gql from 'graphql-tag'

export const getAllMaps = gql`
{
    maps {
        id
        title
        description
        image
        projection {
            srid
        }
        layers {
            id
            layer {
                id
                title
                description
                type
                projection {
                    id
                    srid
                }
            }
        }
    }
}`
