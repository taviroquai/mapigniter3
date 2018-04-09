import Store from 'react-observable-store';
import { Cookies } from 'react-cookie';
const cookies = new Cookies();

const updateField = (name, value) => {
    Store.set('login.'+name, value);
};

const logout = async (cb) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            Store.set('profile.user', false);
            resolve();
        });
    });
};

const login = async (cb) => {
    var secret = {
        email: Store.get('login.email'),
        password: Store.get('login.pwd')
    }
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(secret)
        })
        .then(res => res.json())
        .then(result => {
            if (result.profile) {
                Store.set('profile.user', result.profile);
                resolve(result.jwt);
            } else {
                Store.set('login.errors', result);
                resolve(false);
            }
        });
    });
}

const getUser = async () => {
    var result = await fetchUser()
    if (result) Store.update('profile', {user: result.user, loading: false})
}

const fetchUser = () => {
    const auth_token = cookies.get('jwt_token');
    const endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/user', {
            headers: {
                'Accept': 'application/json, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + auth_token
            }
        })
        .then(res => res.json())
        .then((data) => {
            resolve(data);
        })
        .catch(error => {
            resolve(false);
        })
    });
};

export default {
    updateField,
    logout,
    login,
    getUser
}
