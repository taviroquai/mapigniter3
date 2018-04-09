import Store from 'react-observable-store';
import ApolloClient from "apollo-boost";
import * as Queries from './queries';

const reload = () => {
    const client = new ApolloClient({
        uri: Store.get('server.endpoint') + '/api'
    });
    const query = Queries.getAllMaps
    client.query({ query }).then(r => {
        Store.update('home', {loading: r.loading})
        if ((r.networkStatus === 7) && !r.errors) {
            Store.set('home.maps', r.data.maps);
        }
    });
};

const saveRequest = async (item, auth_token) => {
    const url = Store.get('server.endpoint') + '/request';
    const headers = {}
    headers['Content-Type'] = 'application/json'
    headers['Authorization'] = 'Basic ' + auth_token
    fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: JSON.stringify(item)
    })
    .then(res => res.json())
    .then((result) => {
        //resolve(result)
    }).catch(err => {
        console.log(err)
    })
}

export default {
    reload,
    saveRequest
}
