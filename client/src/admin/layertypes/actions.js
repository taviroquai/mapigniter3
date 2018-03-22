import Store from 'react-observable-store';
import Server from '../../server';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/layertype';
    const t = setTimeout(() => { Store.update('layertype', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('layertype', {loading: false})
    if (result && result.success) Store.set('layertype.items', result.items);
};

const editNewItem = () => {
    const item = { id: null, label: '', key: '' }
    setTimeout(() => { Store.update('layertype', {form: item, error: false}) }, 1);
};

const editItem = async (id = false) => {
    if (!id) return editNewItem();
    const url = Store.get('server.endpoint') + '/layertype/' + id;
    const t = setTimeout(() => { Store.update('layertype', {loading: true}) }, 1000);
    const result = await Server.get(url);
    clearTimeout(t);
    if (result && result.success) Store.update('layertype', { loading: false, form: result.item });
    else Store.update('layertype', {loading: false, error: false})
};

const setSort = (column) => {
    const sortc = Store.get('layertype.sortc');
    const sortd = Store.get('layertype.sortd');
    Store.update('layertype', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

const submit = async () => {
    const t = setTimeout(() => { Store.update('layertype', {loading: true}) }, 1000);
    const item = Store.get('layertype.form');
    const url = Store.get('server.endpoint') + '/layertype';
    const result = await Server.post(url, item)
    clearTimeout(t)
    Store.update('layertype', {loading: false, error: false})
    if (result && result.success) Store.set('layertype.form', result.item)
    else Store.set('layertype.error', result.error)
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('layertype', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/layertype/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('layertype', {loading: false})
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
