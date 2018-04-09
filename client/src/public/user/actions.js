import Store from 'react-observable-store';
import Server from '../../server';

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
    RecoverInput,
    RecoverSubmit,
    ResetInput,
    ResetToken,
    ResetSubmit
}
