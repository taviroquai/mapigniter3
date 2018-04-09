import gql from 'graphql-tag'

export const getStats = gql`
{
    getStats {
        stats1 {
            name
            value
            month
            year
        }
    }
}`
