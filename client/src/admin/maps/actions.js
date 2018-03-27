import Store from 'react-observable-store';
import Server from '../../server';
var uploadFile;

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
        id: '',
        title: '',
        seo_slug: '',
        projection_id: '1',
        coordx: 0,
        coordy: 0,
        zoom: 1,
        publish: true,
        image: '',
        description: '',
        layers: []
    }
    uploadFile = null
    setTimeout(() => { Store.update('map', {form: item, error: false}); }, 1);
};

const editItem = async (id = false) => {
    loadProjectionOptions();
    if (!id) return editNewItem();
    uploadFile = null
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

const setUploadFile = (file) => {
    uploadFile = file;
}

const submitImage = async (map) => {
    const url = Store.get('server.endpoint') + '/map';
    Store.update('map', {loading: true, error: false});
    const formData = new FormData();
    formData.append('image', uploadFile.image);
    const resultUpload = await Server.post(url+'/'+map.id+'/image', formData, true);
    if (resultUpload && resultUpload.success) {
        Store.update('map', {loading: false, form: resultUpload.item})
    } else {
        Store.update('map', {loading: false, error: resultUpload.error})
    }
}

const submit = async () => {
    Store.update('map', { loading: true, error: false })
    const item = Store.get('map.form');
    const url = Store.get('server.endpoint') + '/map';
    const result = await Server.post(url, item);
    if (result && result.success) {
        Store.update('map', {loading: false, form: result.item})
        if (uploadFile) await submitImage(result.item)
    } else {
        Store.update('map', {loading: false, error: result.error})
    }
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/map/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) await reload()
}

const removeLayer = async (item) => {
    const map_id = item.map_id
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/maplayer/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) await editItem(map_id)
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
    removeLayer,
    setUploadFile
}
