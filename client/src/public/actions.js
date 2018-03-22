import Store from 'react-observable-store';
import Server from '../server';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/public/map';
    const t = setTimeout(() => { Store.update('home', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('home', {loading: false})
    if (result && result.success) Store.set('home.maps', result.items);
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
