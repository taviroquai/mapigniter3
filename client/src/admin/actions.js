import Store from 'react-observable-store';
import { getGraphqlClient } from '../server';
import * as Queries from './queries';

const DashboardLoad = async () => {
    const client = getGraphqlClient();
    const query = Queries.getStats;
    return new Promise(resolve => {
        client.query({ query }).then(r => {
            Store.update('dashboard', {data1: r.data.getStats.stats1, loading: false, error: null});
            resolve(true);
        })
        .catch(error => {
            if (error.networkError) {
                Store.update('dashboard', {error: error.networkError.message, loading: false});
            }
            resolve(false);
        });
    });
};

export default {
    DashboardLoad
}
