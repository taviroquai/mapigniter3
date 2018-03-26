import Store from 'react-observable-store';
import Server from '../../server';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const reload = async () => {
    const url = Store.get('server.endpoint') + '/map';
    const t = setTimeout(() => { Store.update('map', {loading: true}) }, 1000);
    const result = await Server.get(url)
    clearTimeout(t)
    Store.update('map', {loading: false})
    if (result && result.success) Store.set('mapdisplay.items', result.items);
};

const loadMap = async (id, history) => {
    const client = new ApolloClient({
        uri: Store.get('server.endpoint') + '/api'
    });
    const query = gql`
    query getMap($id: ID!) {
        map(id: $id) {
            id
            title
            description
            image
            coordx
            coordy
            projection {
                srid
            }
            layers {
                id
                parent_id
                map_id
                layer_id
                visible
                display_order
                baselayer
                layer {
                    id
                    title
                    description
                    type
                    seo_slug
                    publish
                    image
                    feature_info_template
                    search
                    min_resolution
                    max_resolution
                    bing_key
                    bing_imageryset
                    mapquest_layer
                    gpx_filename
                    kml_filename
                    geopackage_filename
                    geopackage_table
                    geopackage_fields
                    geojson_geomtype
                    geojson_attributes
                    geojson_features
                    postgis_host
                    postgis_port
                    postgis_user
                    postgis_dbname
                    postgis_schema
                    postgis_table
                    postgis_field
                    postgis_attributes
                    wms_url
                    wms_version
                    wms_servertype
                    wms_tiled
                    wms_layers
                    wfs_url
                    wfs_version
                    wfs_typename
                    projection {
                        id
                        srid
                    }
                }
            }
        }
    }`
    client.query({ query, variables: { id } }).then(r => {
        Store.update('mapdisplay', {loading: r.loading})
        if ((r.data) && !r.errors) {
            Store.set('mapdisplay.current', r.data.map);
        }
    });
};

const loadFeatures = async (url, contentType) => {
    var endpoint = Store.get('server.endpoint');
    return new Promise(resolve => {
        fetch(endpoint+'/proxy?url='+url, {
            headers: {
                'Content-Type': contentType
            }
        })
        .then(res => res.json())
        .then((data) => {
            resolve(data);
        });
    });
}

export default {
    reload,
    loadMap,
    loadFeatures
}
