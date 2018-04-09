import Store from 'react-observable-store';
import Server, { getGraphqlClient } from '../../server';
import * as Queries from './queries';
import * as MapLayerQueries from '../maplayers/queries';
import * as ProjectionQueries from '../projections/queries';

var files = {
    image: null
};

const reload = async () => {
    const client = getGraphqlClient();
    const query = Queries.getAllMaps
    client.query({ query }).then(r => {
        Store.update('map', {items: r.data.maps, loading: false, error: null});
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const editItem = async (id = false) => {
    loadProjectionOptions();
    if (!id) return editNewItem();
    files.image = null;
    const client = getGraphqlClient();
    const query = Queries.getMapById
    client.query({ query, variables: { id } }).then(r => {
        Store.update('map', {form: r.data.map, loading: false, error: null});
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const submit = async () => {
    var query, item = Store.get('map.form');
    const client = getGraphqlClient();
    if (item.id) query = Queries.updateMap
    else query = Queries.addMap
    client.mutate({ mutation: query, variables: item }).then(async (r) => {
        item = Object.assign(item, item.id ? r.data.updateMap : r.data.addMap);
        Store.update('map', {form: item});
        if (files.image) await uploadMapImage(item, files.image)
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const removeItem = async (item) => {
    const client = getGraphqlClient();
    const query = Queries.removeMap
    client.mutate({ mutation: query, variables: {id: item.id} }).then(async (r) => {
        Store.update('map', {loading: false})
        await reload()
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const removeLayer = async (item) => {
    const client = getGraphqlClient();
    const query = MapLayerQueries.removeMapLayer
    client.mutate({ mutation: query, variables: {id: item.id} }).then(async (r) => {
        Store.update('map', {loading: false})
        await editItem(item.map_id)
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const loadProjectionOptions = async () => {
    const client = getGraphqlClient();
    const query = ProjectionQueries.getAllProjections;
    client.query({ query }).then(r => {
        Store.update('map', {projections: r.data.projections, loading: false})
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const editNewItem = () => {
    const item = {
        id: '',
        title: '',
        seo_slug: '',
        projection_id: '1',
        coordx: 0,
        coordy: 0,
        zoom: 0,
        publish: true,
        image: '',
        description: '',
        layers: []
    }
    files.image = null
    setTimeout(() => {
        Store.update('map', {form: item, error: false});
    }, 1);
};

const uploadMapImage = async (map, file) => {
    const url = Store.get('server.endpoint') + '/map';
    Store.update('map', {loading: true, error: false});
    const formData = new FormData();
    formData.append('image', file);
    const result = await Server.post(url+'/'+map.id+'/image', formData, true);
    if (result && result.success) {
        Store.update('map', {loading: false, form: {...map, image: result.image}})
    } else {
        Store.update('map', {loading: false, error: result.error})
    }
}

const setSort = (column) => {
    const sortc = Store.get('map.sortc');
    const sortd = Store.get('map.sortd');
    Store.update('map', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort,
    removeLayer,
    files: files
}
