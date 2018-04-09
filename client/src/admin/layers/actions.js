import Store from 'react-observable-store';
import Server, { getGraphqlClient } from '../../server';
import * as Queries from './queries';
import * as LayerTypeQueries from '../layertypes/queries';
import * as ProjectionQueries from '../projections/queries';
import OlWMSCapabilities from 'ol/format/wmscapabilities';
import xml2js from 'xml2js';

const files = {
    image: null,
    dataFile: null,
    field: null
};

const reload = async () => {
    const client = getGraphqlClient();
    const query = Queries.getAllLayers
    client.query({ query }).then(r => {
        Store.update('layer', {items: r.data.layers, loading: false, error: null});
    })
    .catch(error => {
        Store.update('layer', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const editNewItem = () => {
    const item = {
        id: '',
        title: '',
        seo_slug: '',
        publish: true,
        image: '',
        description: '',
        type: '',
        projection_id: '1',
        min_resolution: '',
        max_resolution: '',
        feature_info_template: '',
        search: '',
        bing_key: '',
        bing_imageryset: '',
        mapquest_layer: 'sat',
        gpx_filename: '',
        kml_filename: '',
        geopackage_filename: '',
        geopackage_table: '',
        geopackage_fields: '',
        geojson_geomtype: 'Point',
        geojson_attributes: '',
        geojson_features: '',
        postgis_host: 'localhost',
        postgis_port: '5432',
        postgis_user: '',
        postgis_pass: '',
        postgis_dbname: '',
        postgis_schema: 'public',
        postgis_table: '',
        postgis_field: '',
        postgis_attributes: '',
        wms_url: '',
        wms_version: '1.3.0',
        wms_servertype: 'geoserver',
        wms_tiled: '1',
        wms_layers: '',
        wfs_url: '',
        wfs_version: '1.0.0',
        wfs_typename: ''
    }
    files.image = null;
    files.dataFile = null;
    setTimeout(() => {
        Store.update('layer', {form: item, error: false});
    }, 1);
};

const editItem = async (id = false) => {
    loadTypeOptions();
    loadProjectionOptions();
    if (!id) return editNewItem();
    files.image = null;
    files.dataFile = null;

    const client = getGraphqlClient();
    const query = Queries.getLayerById;
    client.query({ query, variables: { id } }).then(r => {
        Store.update('layer', {form: r.data.layer, loading: false, error: null});
    })
    .catch(error => {
        Store.update('layer', {error: error.graphQLErrors[0].message, loading: false})
    })
};

const submit = async () => {
    var query, item = Store.get('layer.form');
    const client = getGraphqlClient();
    if (item.id) query = Queries.updateLayer
    else query = Queries.addLayer
    client.mutate({ mutation: query, variables: item }).then(async (r) => {
        item = Object.assign(item, item.id ? r.data.updateLayer : r.data.addLayer);
        Store.update('layer', {form: item});
        if (files.image) await submitFile(item.id, files.image, 'image')
        if (files.dataFile) await submitFile(item.id, files.dataFile, files.field)
    })
    .catch(error => {
        Store.update('map', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const removeItem = async (item) => {
    const client = getGraphqlClient();
    client.mutate({ mutation: Queries.removeLayer, variables: {id: item.id} }).then(async (r) => {
        Store.update('layer', {loading: false})
        await reload()
    })
    .catch(error => {
        Store.update('layer', {error: error.graphQLErrors[0].message, loading: false})
    })
}

const loadTypeOptions = async () => {
    const client = getGraphqlClient();
    const query = LayerTypeQueries.getAllLayerTypes
    client.query({ query }).then(r => {
        Store.update('layer', {types: r.data.layerTypes});
    })
    .catch(error => {
        Store.update('layer', {error: error.graphQLErrors[0].message})
    });
}

const loadProjectionOptions = async () => {
    const client = getGraphqlClient();
    const query = ProjectionQueries.getAllProjections
    client.query({ query }).then(r => {
        Store.update('layer', {projections: r.data.projections});
    })
    .catch(error => {
        Store.update('layer', {error: error.graphQLErrors[0].message})
    });
}

const postgisConnect = async () => {
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const item = Store.get('layer.form');
    const url = Store.get('server.endpoint') + '/layer/postgis/connect';
    const result = await Server.post(url, item);
    clearTimeout(t)
    Store.update('layer', {loading: false, error: false})
    if (result && result.success) {
        Store.update('layer', { postgis: result.options })
    } else Store.set('layer.error', result.error)
}

const getWMSCapabilities = async () => {
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const item = Store.get('layer.form');
    const url = Store.get('server.endpoint') + '/layer/wms/getcapabilities';
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    .then(response => response.text())
    .then((result) => {
        clearTimeout(t)
        if (result) {
            Store.update('layer', {loading: false, error: false})
            const reader = new OlWMSCapabilities();
            const parsedResult = reader.read(result);
            if (parsedResult && parsedResult.Capability.Layer.Layer) {
                var options = parsedResult.Capability.Layer.Layer.map(l => {
                    return {key: l.Name, value: l.Name, text: l.Title, crs: l.CRS}
                });
                Store.update('layer', {wms_options: options});
            }
        } else Store.update('layer', {loading: false, error: true})
    }).catch(err => {
        clearTimeout(t)
        Store.update('layer', {loading: false, error: false})
    });
}

const getWFSCapabilities = async () => {
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const item = Store.get('layer.form');
    const url = Store.get('server.endpoint') + '/layer/wfs/getcapabilities';
    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(item)
    })
    .then(response => response.text())
    .then((result) => {
        clearTimeout(t)
        if (result) {
            Store.update('layer', {loading: false, error: false})
            var parseString = xml2js.parseString;
            parseString(result, function (err, p) {
                if (!err && p.WFS_Capabilities.FeatureTypeList) {
                    var options = p.WFS_Capabilities.FeatureTypeList[0].FeatureType.map(l => {
                        return {
                            key: l.Name[0],
                            value: l.Name[0],
                            text: l.Title[0],
                            crs: l.SRS.join(',')
                        }
                    });
                    Store.update('layer', {wfs_options: options});
                }
            });
        } else Store.update('layer', {loading: false, error: true})
    }).catch(err => {
        clearTimeout(t)
        Store.update('layer', {loading: false, error: false})
    });
}

const submitFile = async (layer_id, file, field) => {
    const url = Store.get('server.endpoint') + '/layer/'+layer_id+'/upload/'+field;
    const formData = new FormData();
    formData.append('file', file);
    Store.update('layer', {loading: true, error: false});
    const result = await Server.post(url, formData, true);
    const layer = Store.get('layer.form');
    if (result && result.success) {
        Store.update('layer', {loading: false, form: {...layer, [field]: result.filename}})
    } else {
        Store.update('layer', {loading: false, error: result.error})
    }
}

const setSort = (column) => {
    const sortc = Store.get('layer.sortc');
    const sortd = Store.get('layer.sortd');
    Store.update('layer', {
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
    files: files,
    loadTypeOptions,
    loadProjectionOptions,
    postgisConnect,
    getWMSCapabilities,
    getWFSCapabilities
}
