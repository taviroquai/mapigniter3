import Store from 'react-observable-store';
import { getGraphqlClient } from '../../server';
import * as Queries from './queries';

const reload = async () => {
    const client = getGraphqlClient();
    const query = Queries.getAllProjections;
    client.query({ query }).then(r => {
        Store.update('projection', {items: r.data.projections});
    })
    .catch(error => {
        Store.update('projection', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const editItem = async (id = false) => {
    if (!id) return editNewItem();
    const client = getGraphqlClient();
    const query = Queries.getProjectionById
    client.query({ query, variables: { id } }).then(r => {
        Store.update('projection', {form: r.data.projection, loading: false});
    })
    .catch(error => {
        Store.update('projection', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const submit = async () => {
    return new Promise(resolve => {
        var query, item = Store.get('projection.form');
        const client = getGraphqlClient();
        if (item.id) query = Queries.updateProjection
        else query = Queries.addProjection
        client.mutate({ mutation: query, variables: item }).then(async (r) => {
            Store.update('projection', {form: item, error: false, loading: false});
            resolve(true)
        })
        .catch(error => {
            Store.update('projection', {error: error.graphQLErrors[0].message, loading: false})
            resolve(false)
        })
    })
}

const removeItem = async (item) => {
    const client = getGraphqlClient();
    const query = Queries.removeProjection
    client.mutate({ mutation: query, variables: {id: item.id} }).then(async (r) => {
        Store.update('projection', {loading: false})
        await reload()
    })
    .catch(error => {
        Store.update('projection', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const editNewItem = () => {
    const item = {
        srid: 0,
        proj4_params: '',
        extent: ''
    }
    setTimeout(() => {
        Store.update('projection', {form: item, error: false});
    }, 1);
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

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort
}
