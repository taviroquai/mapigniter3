import Store from 'react-observable-store';
import Server from '../../server';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/map';
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) Store.set('map.items', result.items);
};

const editNewItem = () => {
    const item = {
        id: null,
        title: '',
        seo_slug: '',
        projection_id: '',
        layers: []
    }
    setTimeout(() => { Store.update('map', {form: item, error: false}); }, 1);
};

const editItem = async (id = false) => {
    loadProjectionOptions();
    if (!id) return editNewItem();
    const url = Store.get('server.endpoint') + '/map/' + id;
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('map', {loading: false, error: false})
    if (result && result.success) Store.set('map.form', result.item);
};

const setSort = (column) => {
    const sortc = Store.get('map.sortc');
    const sortd = Store.get('map.sortd');
    Store.update('map', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

const submit = async () => {
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const item = Store.get('map.form');
    const url = Store.get('server.endpoint') + '/map';
    const result = await Server.post(url, item)
    clearTimeout(t)
    Store.update('map', {loading: false, error: false})
    if (result && result.success) Store.set('map.form', result.item)
    else Store.set('map.error', result.error)
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/map/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) await reload()
}

const loadProjectionOptions = async () => {
    const url = Store.get('server.endpoint') + '/projection';
    const result = await Server.get(url)
    Store.update('map', {projections: result.items})
}

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort,
    loadProjectionOptions
}
