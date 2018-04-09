import Store from 'react-observable-store';
import { getGraphqlClient } from '../../server';
import * as Queries from './queries';
import * as MapQueries from '../maps/queries';
import * as LayerQueries from '../layers/queries';

const editNewItem = (map_id) => {
    loadMapOptions();
    loadLayerOptions();
    loadGroupOptions(map_id);
    const item = {
        id: null,
        map_id: parseInt(map_id, 10),
        parent_id: '',
        layer_id: '',
        visible: true,
        display_order: 1,
        baselayer: false
    }
    setTimeout(() => {
        Store.update('maplayer', {form: item, error: false});
    }, 1);
};

const submit = async () => {
    return new Promise(resolve => {
        var item = Store.get('maplayer.form');
        const client = getGraphqlClient();
        const query = Queries.addMapLayer;
        client.mutate({ mutation: query, variables: item }).then(async (r) => {
            item = Object.assign(item, r.data.addMapLayer);
            Store.update('maplayer', {form: item});
            resolve(true);
        })
        .catch(error => {
            Store.update('maplayer', {error: error.graphQLErrors[0].message, loading: false})
            resolve(false);
        });
    })
}

const loadMapOptions = async () => {
    const client = getGraphqlClient();
    const query = MapQueries.getAllMaps;
    client.query({ query }).then(r => {
        Store.update('maplayer', {maps: r.data.maps});
    })
    .catch(error => {
        Store.update('maplayer', {error: error.graphQLErrors[0].message})
    });
}

const loadLayerOptions = async () => {
    const client = getGraphqlClient();
    const query = LayerQueries.getAllLayers;
    client.query({ query }).then(r => {
        Store.update('maplayer', {layers: r.data.layers});
    })
    .catch(error => {
        Store.update('maplayer', {error: error.graphQLErrors[0].message})
    });
}

const loadGroupOptions = async (map_id) => {
    const client = getGraphqlClient();
    const query = Queries.getMapLayersByMapId;
    client.query({ query, variables: {map_id} }).then(r => {
        Store.update('maplayer', {groups: r.data.mapLayers});
    })
    .catch(error => {
        Store.update('maplayer', {error: error.graphQLErrors[0].message})
    });
}

export default {
    editNewItem,
    submit
}
