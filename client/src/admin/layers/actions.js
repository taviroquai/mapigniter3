import Store from 'react-observable-store';
import Server from '../../server';
import OlWMSCapabilities from 'ol/format/wmscapabilities';
import xml2js from 'xml2js';
var uploadFile;
var uploadImage;

const reload = async () => {
    const url = Store.get('server.endpoint') + '/layer';
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('layer', {loading: false})
    if (result && result.success) Store.set('layer.items', result.items);
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
    setUploadFile(false);
    setTimeout(() => { Store.update('layer', {form: item, error: false}); }, 1);
};

const editItem = async (id = false) => {
    loadTypeOptions();
    loadProjectionOptions();
    if (!id) return editNewItem();
    const url = Store.get('server.endpoint') + '/layer/' + id;
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('layer', {loading: false, error: false})
    if (result && result.success) Store.set('layer.form', result.item);
};

const setSort = (column) => {
    const sortc = Store.get('layer.sortc');
    const sortd = Store.get('layer.sortd');
    Store.update('layer', {
        sortc: column,
        sortd: sortc === column && sortd === 'ascending' ? 'descending'
            : 'ascending'
    });
}

const setUploadFile = (file) => {
    uploadFile = file;
}

const setUploadImage = (file) => {
    uploadImage = file;
}

const execSubmitFile = async (url, formData) => {
    Store.update('layer', {loading: true, error: false});
    const resultUpload = await Server.post(url, formData, true);
    if (resultUpload && resultUpload.success) {
        Store.update('layer', {loading: false, form: resultUpload.item})
    } else {
        Store.update('layer', {loading: false, error: resultUpload.error})
    }
}

const submitImage = async (layer) => {
    const url = Store.get('server.endpoint') + '/layer/'+layer.id+'/image';
    const formData = new FormData();
    formData.append('image', uploadImage.image);
    await execSubmitFile(url, formData)
}

const submitFile = async (layer) => {
    const url = Store.get('server.endpoint') + '/layer/'+layer.id+'/file';
    const formData = new FormData();
    formData.append('file', uploadFile.file);
    formData.append('field', uploadFile.field);
    await execSubmitFile(url, formData)
}

const submit = async () => {
    Store.update('layer', { loading: true, error: false })
    const item = Store.get('layer.form');
    const url = Store.get('server.endpoint') + '/layer';
    const result = await Server.post(url, item);
    if (result && result.success) {
        Store.update('layer', {loading: false, form: result.item})
        if (uploadImage) await submitImage(result.item)
        if (uploadFile) await submitFile(result.item)
    } else {
        Store.update('layer', {loading: false, error: result.error})
    }
}

const removeItem = async (item) => {
    const t = setTimeout(() => { Store.update('layer', {loading: true}) }, 1000);
    const url = Store.get('server.endpoint') + '/layer/'+item.id
    const result = await Server.remove(url)
    clearTimeout(t)
    Store.update('layer', {loading: false})
    if (result && result.success) await reload()
}

const loadTypeOptions = async () => {
    const url = Store.get('server.endpoint') + '/layertype';
    const result = await Server.get(url)
    Store.update('layer', {types: result.items})
}

const loadProjectionOptions = async () => {
    const url = Store.get('server.endpoint') + '/projection';
    const result = await Server.get(url)
    Store.update('layer', {projections: result.items})
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
            const parsedCapabilities = reader.read(result);
            if (parsedCapabilities.Capability.Layer.Layer) {
                var options = parsedCapabilities.Capability.Layer.Layer.map(l => {
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
                        return {key: l.Name[0], value: l.Name[0], text: l.Title[0], crs: l.SRS.join(',')}
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

export default {
    reload,
    editNewItem,
    editItem,
    submit,
    removeItem,
    setSort,
    setUploadImage,
    loadTypeOptions,
    loadProjectionOptions,
    setUploadFile,
    postgisConnect,
    getWMSCapabilities,
    getWFSCapabilities
}
