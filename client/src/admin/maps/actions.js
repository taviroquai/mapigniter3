import Store from 'react-observable-store';
import Server from '../../server';
import ApolloBoost from "apollo-boost";
import gql from "graphql-tag";
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
    const result = await Server.post(url+'/'+map.id+'/image', formData, true);
    if (result && result.success) {
        map.image = result.image
        Store.update('map', {loading: false, form: map})
    } else {
        Store.update('map', {loading: false, error: result.error})
    }
}

const submit = async () => {
    const client = new ApolloBoost({
        uri: Store.get('server.endpoint') + '/api'
    });
    const query = gql`
    mutation addMap($title: String!, $seo_slug: String!, $projection_id: Int!, $publish: Boolean!, $id: ID) {
        addMap(title: $title, seo_slug: $seo_slug, projection_id: $projection_id, publish: $publish, id: $id) {
            id
            title
            seo_slug
            projection_id
            coordx
            coordy
            publish
            description
            zoom
        }
    }`
    const item = Store.get('map.form');
    client.mutate({ mutation: query, variables: item }).then(async (r) => {
        Store.update('map', {loading: r.loading})
        if ((r.data) && !r.errors) {
            Store.update('map', {form: Object.assign(item, r.data.addMap)});
            console.log('map', Store.get('map.form'))
            if (uploadFile) await submitImage(r.data.addMap)
        } else {
            Store.update('map', {loading: false, error: r.errors})
        }
    });
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
