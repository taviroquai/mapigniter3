import Store from 'react-observable-store';
import { getGraphqlClient } from '../../server';
import * as Queries from './queries';

const reload = async () => {
    const client = getGraphqlClient();
    const query = Queries.getAllLayerTypes;
    client.query({ query }).then(r => {
        Store.update('layertype', {items: r.data.layerTypes, error: null});
    })
    .catch(error => {
        Store.update('layertype', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const editItem = async (id = false) => {
    if (!id) return editNewItem();
    const client = getGraphqlClient();
    const query = Queries.getLayerTypeById;
    client.query({ query, variables: { id } }).then(r => {
        Store.update('layertype', {form: r.data.layerType, loading: false, error: null});
    })
    .catch(error => {
        Store.update('layertype', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const submit = async () => {
    return new Promise(resolve => {
        var query, item = Store.get('layertype.form');
        const client = getGraphqlClient();
        if (item.id) query = Queries.updateLayerType
        else query = Queries.addLayerType
        client.mutate({ mutation: query, variables: item }).then(async (r) => {
            Store.update('layertype', {form: item, loading: false, error: null});
            resolve(true)
        })
        .catch(error => {
            Store.update('layertype', {error: error.graphQLErrors[0].message, loading: false})
            resolve(false)
        });
    })
}

const removeItem = async (item) => {
    const client = getGraphqlClient();
    const query = Queries.removeLayerType
    client.mutate({ mutation: query, variables: {id: item.id} }).then(async (r) => {
        Store.update('layertype', {loading: false, error: null})
        await reload()
    })
    .catch(error => {
        Store.update('layertype', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const editNewItem = () => {
    const item = {
        id: '',
        label: '',
        key: ''
    }
    setTimeout(() => {
        Store.update('layertype', {form: item, error: false})
    }, 1);
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

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort
}
