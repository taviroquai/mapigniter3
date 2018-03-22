import Store from 'react-observable-store';
import Server from '../../server';

const reload = async () => {
    const url = Store.get('server.endpoint') + '/maplayer';
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('maplayer', {loading: false})
    if (result && result.success) Store.set('maplayer.items', result.items);
};

const editNewItem = (map_id) => {
    const item = {
        id: null,
        map_id: parseInt(map_id, 10),
        parent_id: '',
        layer_id: '',
        visible: true,
        display_order: 1,
        baselayer: false
    }
    setTimeout(() => { Store.update('maplayer', {form: item, error: false}); }, 1);
};

const editItem = async (map_id, id = false) => {
    loadMapOptions();
    loadLayerOptions();
    loadGroupOptions(map_id);
    if (!id) return editNewItem(map_id);
    const url = Store.get('server.endpoint') + '/maplayer/' + map_id + '/' + id;
    const t = setTimeout(() => { Store.update('maplayer', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('maplayer', {loading: false, error: false})
    if (result && result.success) Store.set('maplayer.form', result.item);
};

const setSort = (column) => {
    const sortc = Store.get('map.sortc');
    const sortd = Store.get('map.sortd');
    Store.update('maplayer', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

const submit = async () => {
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const item = Store.get('maplayer.form');
    const url = Store.get('server.endpoint') + '/maplayer';
    const result = await Server.post(url, item)
    clearTimeout(t)
    Store.update('maplayer', {loading: false, error: false})
    if (result && result.success) Store.set('maplayer.form', result.item)
    else Store.set('maplayer.error', result.error)
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('maplayer', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/maplayer/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('maplayer', {loading: false})
    if (result && result.success) await reload()
}

const loadMapOptions = async () => {
    const url = Store.get('server.endpoint') + '/map';
    const result = await Server.get(url)
    Store.update('maplayer', {maps: result.items})
}

const loadLayerOptions = async () => {
    const url = Store.get('server.endpoint') + '/layer';
    const result = await Server.get(url)
    Store.update('maplayer', {layers: result.items})
}

const loadGroupOptions = async (map_id) => {
    const url = Store.get('server.endpoint') + '/maplayer/' + map_id;
    const result = await Server.get(url)
    Store.update('maplayer', {groups: result.items})
}

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort
}
