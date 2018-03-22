import Store from 'react-observable-store';

const updateField = (name, value) => {
    Store.set('login.'+name, value);
};

const logout = (cookies, history) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/logout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then((data) => {
            Store.set('profile.user', false);
            cookies.remove('auth_token');
            cookies.remove('mapigniter3');
            history.push('/')
        });
    });
};

const login = async (cookies, history) => {
    var auth_token = btoa(Store.get('login.email')+':'+Store.get('login.pwd'));
    var result = await fetchLogin(auth_token);
    if (result.profile) {
        Store.set('profile.user', result.profile);
        cookies.set('auth_token', auth_token);
        history.push('/');
    } else Store.set('login.errors', result);
}

const fetchLogin = (auth_token) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/login', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + auth_token
            }
        })
        .then(res => res.json())
        .then((data) => {
            resolve(data);
        });
    });
}

const getUser = async (auth_token) => {
    var result = await fetchUser(auth_token)
    if (result.user) Store.set('profile.user', result.user)
}

const fetchUser = (auth_token) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint + '/user', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + auth_token
            }
        })
        .then(res => res.json())
        .then((data) => {
            resolve(data);
        });
    });
};

export default {
    updateField,
    logout,
    login,
    getUser
}
