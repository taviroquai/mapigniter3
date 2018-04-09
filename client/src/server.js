import Store from 'react-observable-store';
import { Cookies } from 'react-cookie';
import ApolloBoost from "apollo-boost";
const cookies = new Cookies();

export const getGraphqlClient = () => {
    const client = new ApolloBoost({
        uri: Store.get('server.endpoint') + '/api/admin',
        request: async (operation) => {
            const auth_token = cookies.get('jwt_token')
            operation.setContext({
                headers: {
                    authorization: 'Bearer ' + auth_token
                }
            });
        },
    });
    return client
}

const get = (url) => {
    const cookies = new Cookies();
    return new Promise(resolve => {
        fetch(url, {
            //credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('jwt_token')
            }
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
};

const post = (url, data, isFormData = false) => {
    const cookies = new Cookies();
    return new Promise(resolve => {
        const headers = {
            'Authorization': 'Bearer ' + cookies.get('jwt_token')
        }
        if (!isFormData) headers['Content-Type'] = 'application/json'
        fetch(url, {
            method: 'POST',
            //credentials: 'include',
            headers: headers,
            body: isFormData ? data : JSON.stringify(data)
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
}

const remove = (url) => {
    const cookies = new Cookies();
    return new Promise(resolve => {
        fetch(url, {
            method: 'DELETE',
            //credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + cookies.get('jwt_token')
            }
        })
        .then(res => res.json())
        .then((result) => {
            resolve(result)
        }).catch(err => {
            resolve(false)
        })
    })
}

export default {
    get,
    post,
    remove
}
