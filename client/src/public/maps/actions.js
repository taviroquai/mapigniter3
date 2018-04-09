import Store from 'react-observable-store';
import Server from '../../server';
import ApolloClient from "apollo-boost";
import * as Queries from './queries';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/map';
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) Store.set('mapdisplay.items', result.items);
};

const loadMap = async (id, history) => {
    const client = new ApolloClient({
        uri: Store.get('server.endpoint') + '/api'
    });
    const query = Queries.getLayerById
    client.query({ query, variables: { id } }).then(r => {
        Store.update('mapdisplay', {loading: r.loading})
        if ((r.data) && !r.errors) {
            Store.set('mapdisplay.current', r.data.map);
        }
    });
};

const loadFeatures = async (url, contentType) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint+'/proxy?url='+url, {
            headers: {
                'Content-Type': contentType
            }
        })
        .then(res => res.json())
        .then((data) => {
            resolve(data);
        });
    });
}

export default {
    reload,
    loadMap,
    loadFeatures
}
