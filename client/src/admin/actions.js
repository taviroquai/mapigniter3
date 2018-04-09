import Store from 'react-observable-store';
import { getGraphqlClient } from '../server';
import * as Queries from './queries';

const DashboardLoad = async () => {
    const client = getGraphqlClient();
    const query = Queries.getStats;
    client.query({ query }).then(r => {
        Store.update('dashboard', {data1: r.data.getStats.stats1, loading: false, error: null});
    })
    .catch(error => {
        Store.update('dashboard', {error: error.graphQLErrors[0].message, loading: false})
    })
};

export default {
    DashboardLoad
}
