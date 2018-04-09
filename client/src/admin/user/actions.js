import Store from 'react-observable-store';
import Server from '../../server';

export const ProfileGetUser = async () => {
    const url = Store.get('server.endpoint') + '/user';
    const t = setTimeout(() => { Store.update('profile', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('profile', {loading: false})
    if (result && result.success) Store.set('profile.user', result.user);
};


export const ProfileFormField = (field, value) => {
    Store.set('profile.user.'+field, value);
};

export const ProfileSubmit = async () => {
    const t = setTimeout(() => { Store.update('profile', {loading: true}) }, 1000);
    const item = Store.get('profile.user');
    const url = Store.get('server.endpoint') + '/user';
    const result = await Server.post(url, item);
    clearTimeout(t)
    Store.update('profile', {loading: false, error: false})
    if (result && result.success) Store.set('profile.user', result.user)
    else Store.update('profile', {error: result.error, errors: result.errors})
}

export default {
    ProfileGetUser,
    ProfileFormField,
    ProfileSubmit
}
