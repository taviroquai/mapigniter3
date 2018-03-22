import Store from 'react-observable-store';
import Server from '../../server';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/projection';
    const t = setTimeout(() => { Store.update('projection', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('projection', {loading: false})
    if (result && result.success) Store.set('projection.items', result.items);
};

const editNewItem = () => {
    setTimeout(() => { Store.update('projection', {form: {}, error: false}); }, 1);
};

const editItem = async (id = false) => {
    if (!id) return editNewItem();
    const url = Store.get('server.endpoint') + '/projection/' + id;
    const t = setTimeout(() => { Store.update('projection', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('projection', {loading: false, error: false})
    if (result && result.success) Store.set('projection.form', result.item);
};

const setSort = (column) => {
    const sortc = Store.get('projection.sortc');
    const sortd = Store.get('projection.sortd');
    Store.update('projection', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

const submit = async () => {
    const t = setTimeout(() => { Store.update('projection', {loading: true, error: false}) }, 1000);
    const item = Store.get('projection.form');
    item.srid = parseInt(item.srid, 10)
    const url = Store.get('server.endpoint') + '/projection';
    const result = await Server.post(url, item)
    clearTimeout(t)
    Store.update('projection', {loading: false, error: false})
    if (result && result.success) Store.set('projection.form', result.item)
    else Store.set('projection.error', result.error)
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('projection', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/projection/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('projection', {loading: false})
    if (result && result.success) await reload()
}

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort
}
