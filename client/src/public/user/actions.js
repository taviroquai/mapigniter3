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

export const RecoverInput = (field, value) => {
    Store.set('recover.'+field, value);
};

export const RecoverSubmit = async (cb) => {
    Store.update('recover', {error: false, success: false})
    const t = setTimeout(() => { Store.update('recover', {loading: true}) }, 1000);
    const form = Store.get('recover');
    form.url = window.location.protocol + '//' + window.location.host;
    const url = Store.get('server.endpoint') + '/recover';
    const result = await Server.post(url, form);
    clearTimeout(t)
    Store.update('recover', {loading: false, error: false})
    if (result && result.success) Store.set('recover.success', true)
    else Store.set('recover.error', result.error)
}

export const ResetInput = (field, value) => {
    Store.set('reset.'+field, value);
};

export const ResetToken = (value) => {
    Store.set('reset.token', value);
};

export const ResetSubmit = async (cb) => {
    Store.update('reset', {error: false, success: false})
    const t = setTimeout(() => { Store.update('reset', {loading: true}) }, 1000);
    const form = Store.get('reset');
    const url = Store.get('server.endpoint') + '/reset';
    const result = await Server.post(url, form);
    clearTimeout(t)
    Store.update('reset', {loading: false})
    if (result && result.success) Store.update('reset', {success: true, loading: false})
    else Store.update('reset', {error: true, errors: result.errors, loading: false})
}

export default {
    ProfileGetUser,
    ProfileFormField,
    ProfileSubmit,
    RecoverInput,
    RecoverSubmit,
    ResetInput,
    ResetToken,
    ResetSubmit
}
