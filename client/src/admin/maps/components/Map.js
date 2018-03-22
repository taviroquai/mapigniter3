// TODO: refactor all this code
import React, { Component } from 'react';
import Store from 'react-observable-store';
import Proj4 from 'proj4';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlTileLayer from 'ol/layer/tile';
import OlXYZ from 'ol/source/xyz';
import OlVectorLayer from 'ol/layer/vector';
import OlVectorSource from 'ol/source/vector';
import OlBingMaps from 'ol/source/bingmaps';
import OlTileWMS from 'ol/source/tilewms';
import OlGroup from 'ol/layer/group';
import OlGML2 from 'ol/format/gml2';
import OlGML3 from 'ol/format/gml3';
import OlWFS from 'ol/format/wfs';
import OlGPX from 'ol/format/gpx';
import OlKML from 'ol/format/kml';
import OlGeoJSON from 'ol/format/geojson';
import OlStyle from 'ol/style/style';
import OlIcon from 'ol/style/icon';
import OlStroke from 'ol/style/stroke';
import OlFill from 'ol/style/fill';
import OlCircle from 'ol/style/circle';
import OlProj from 'ol/proj';
import OlProjection from 'ol/proj/projection';
//import GeoPackage from '@ngageoint/geopackage';
import 'ol/ol.css';

class Map extends Component {

    constructor(props) {
        super(props);

        this.olMap = new OlMap({
            target: null,
            layers: [],
            view: new OlView({
                center: null,
                zoom: 2
            })
        });

        // On move map
        if (props.onMoveEnd) {
            this.olMap.on('moveend', (a, b) => {
                var coords = OlProj.transform(this.olMap.getView().getCenter(), 'EPSG:3857', 'EPSG:4326');
                props.onMoveEnd(coords[1], coords[0], this.olMap.getView().getZoom());
            });
        }

        if (props.onSingleClick) {
            this.olMap.on('singleclick', (evt) => {
                let features = [],
                    pixel = this.olMap.getEventPixel(evt.originalEvent),
                    coordinate = evt.coordinate;
                this.olMap.forEachFeatureAtPixel(pixel, function (feature, layer) {
                    if (!layer) return;
                    feature.layer = layer;
                    features.push(feature);
                });
                props.onSingleClick(coordinate, features)
            });
        }
    }

    /**
     * Group layers
     *
     * @param {Object} props Component properties
     */
    addLayersFromProps(props) {
        if (props.layers && !this.olMap.getLayers().length) {
            var layers = []
            props.layers.map((item, i) => {
                if (item.layer.type === 'GROUP') {
                    item.layers = props.layers.filter(sub => sub.parent_id === item.layer.id)
                }
                layers.push(item)
                return item
            })
            layers = layers.filter(item => !item.parent_id)
            layers.map(item => this.addLayer(item))
        }
    }

    /**
     * Init openlayers map from config
     *
     * @param  {Object} props The component properties
     */
    initMap(props) {

    }

    /**
     * Find layer by id
     * @param  {Number}      id The layer id
     * @return {Object|null} The search result
     */
    findLayerById(id) {
        let result = null;
        this.olMap.getLayers().forEach(item => {
            if (item.get('id') === id) result = item
            else if (item instanceof OlGroup) {
                item.getLayers().forEach(sub => {
                    if (sub.get('id') === id) result = sub
                })
            }
        })
        return result;
    }

    /**
     * Set active layers from active property
     *
     * @param {Array} active The list of active layers
     */
    setActiveFromProps(active) {
        let index;
        this.olMap.getLayers().forEach(item => {
            index = active.indexOf(item.get('id'))
            item.setVisible(index > -1);
            if (item instanceof OlGroup) {
                item.getLayers().forEach(sub => {
                    index = active.indexOf(sub.get('id'))
                    sub.setVisible(index > -1);
                })
            }
        });
    }

    /**
     * Get layer extent
     * TODO: WMS
     * @param  {OlLayer} layer The layer to get the extent if exists
     * @return {OlExtent|NULL}      The layer extent or NULL
     */
    getLayerExtent(layer) {
        if (!layer) return null;
        if (layer.type === 'VECTOR') {
            return layer.getSource().getExtent()
        }
        return null;
    }

    /**
     * On DOM ready
     */
    componentDidMount() {
        console.log('map did mount')
        this.olMap.setTarget(document.getElementById('map'));
        var coords = [parseFloat(this.props.coordy), parseFloat(this.props.coordx)];
        coords = OlProj.transform(coords, 'EPSG:4326', 'EPSG:3857');
        this.olMap.getView().setCenter(coords);
        this.olMap.getView().setZoom(this.props.zoom);
        this.addLayersFromProps(this.props)
    }

    /**
     * Add layer to map from configuration
     *
     * @returns {undefined}
     */
    addLayer(item, group = false) {
        var layer = false;
        switch (item.layer.type) {
            case "OSM":
                layer = this.criarLayerOSM(item);
                break;
            case "BING":
                layer = this.createLayerBing(item);
                break;
            case "WMS":
                layer = this.createLayerWMS(item);
                break;
            case "WFS":
                layer = this.createLayerWFS(item);
                break;
            case "GPX":
                layer = this.createLayerGPX(item);
                break;
            case "KML":
                layer = this.createLayerKML(item);
                break;
            /*
            case "GEOPACKAGE":
                layer = this.createLayerGeoPackage(item);
                break;
            */
            case "POSTGIS":
                layer = this.createLayerPostgis(item);
                break;
            case "GEOJSON":
                layer = this.createLayerGeoJSON(item);
                break;
            case "GROUP":
                layer = new OlGroup({visible: item.visible});
                item.layers.map(sub => this.addLayer(sub, layer))
                break;
            default:
                if (console) console.log('Layer type not suported:', item.layer.type);
        }

        // Add layer
        if (layer) {

            // Set display limits
            if (item.layer.min_resolution) layer.setMinResolution(item.layer.min_resolution);
            if (item.layer.max_resolution) layer.setMaxResolution(item.layer.max_resolution);

            // Set extra properties
            layer.set('id', item.id);
            layer.set('group', item.group);
            layer.set('baselayer', item.baselayer);
            layer.setVisible(item.visible);
            layer.set('title', item.layer.title);
            layer.set('content', item.layer.content);
            layer.set('template', item.layer.feature_info_template !== '' ? item.layer.feature_info_template : false);
            layer.set('search', item.layer.search ? item.layer.search.split(',') : false);

            // If group, add layer to group instead of directly to map
            if (group) {
                var collection = group.getLayers()
                collection.push(layer)
                group.setLayers(collection)
            } else {
                this.olMap.addLayer(layer);
            }
        }
    };

    /**
     * Add layer projection
     *
     * @param {Object} layer The layer configuration
     */
    addLayerProjection(layer) {
        if (layer.projection.id !== this.props.projection.id) {
            Proj4.defs("EPSG:" + layer.projection.srid, layer.projection.proj4_params);
            var lproj = new OlProjection({
                code: 'EPSG:' + layer.projection.srid,
                units: 'm',
                extent: layer.projection.extent
            });
            OlProj.addProjection(lproj);
        }
    };

    /**
     * Create Bing layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Tile}
     */
    createLayerBing(item) {
        item.layer['key'] = item.layer.bing_key;
        item.layer['imagerySet'] = item.layer.bing_imageryset;
        var layer = new OlTileLayer({
            visible: item.visible,
            source: new OlBingMaps(item.layer)
        });
        return layer;
    };

    /**
     * Create OSM layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Tile}
     */
    criarLayerOSM(item) {
        var layer = new OlTileLayer({
            source: new OlXYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
        return layer;
    };

    /**
     * Create GPX layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Vector}
     */
    createLayerGPX(item) {
        var style, me = this, url = Store.get('server.endpoint');
        var layer = new OlVectorLayer({
            visible: item.visible,
            source: new OlVectorSource({
                url: url + '/layer/resource/' + item.layer.id + '/' + item.layer.gpx_filename,
                format: new OlGPX()
            }),
            style: function (feature, resolution) {
                style = me.createStyle(item.layer, feature, resolution);
                return [style];
            }
        });
        return layer;
    };

    /**
     * Create KML layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Vector}
     */
    createLayerKML(item) {
        var url = Store.get('server.endpoint');
        var layer = new OlVectorLayer({
            source: new OlVectorSource({
                url: url + '/layer/resource/' + item.layer.id + '/' + item.layer.kml_filename,
                format: new OlKML()
            })
        });
        return layer;
    };

    /**
     * Create GeoPackage layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Vector|Map.createLayerGeoPackage.layer}
     */
    createLayerGeoPackage(item) {
        var style, format = new OlGeoJSON();
        var me = this,
            url = Store.get('server.endpoint')
                + '/layer/resource/' + item.layer.id
                + '/' + item.layer.geopackage_filename;

        var readFeaturesOptions = {
            dataProjection: 'EPSG:' + item.layer.projection.srid,
            featureProjection: 'EPSG:' + this.props.projection.srid
        };

        // Add projection
        this.addLayerProjection(item.layer);

        // Create layer
        var layer = new OlVectorLayer({
            source: new OlVectorSource({
                features: []
            }),
            style: function (feature, resolution) {
                style = me.createStyle(item.layer, feature, resolution);
                return [style];
            }
        });

        // Load all features. TODO: only load extent features using loader
        fetch(url).then(res => res.arrayBuffer())
        .then((response) => {
            me.geoPackageToGeoJSON(response, item.layer.geopackage_table, (geojson) => {
                var features = format.readFeatures(geojson, readFeaturesOptions);
                layer.getSource().addFeatures(features);
            });
        }).catch(err => {
            console.log(err);
        });
        return layer;
    };

    /**
     * Create GeoJSON layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Vector|Map.createLayerGeoJSON.layer}
     */
    createLayerGeoJSON(item) {
        var style, me = this;
        var format = new OlGeoJSON();

        var layer = new OlVectorLayer({
            source: new OlVectorSource({
                features: format.readFeatures(item.layer.geojson_features, {
                    dataProjection: 'EPSG:' +  + item.layer.projection.srid,
                    featureProjection: 'EPSG:' + me.props.projection.srid
                })
            }),
            style: function (feature, resolution) {
                style = me.createStyle(item.layer, feature, resolution);
                return [style];
            }
        });
        return layer;
    };

    /**
     * Create Postgis layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Vector|Map.createLayerPostgis.layer}
     */
    createLayerPostgis(item) {
        var me = this, format = new OlGeoJSON();
        const srid = this.props.projection.srid
        var url = Store.get('server.endpoint')
            + '/layer/postgis/' + item.layer.id + '/geojson';

        // Add projection
        this.addLayerProjection(item.layer);

        // Create layer
        var layer = new OlVectorLayer({
            source: new OlVectorSource({
                features: []
            }),
            style: function (feature, resolution) {
                return [me.createStyle(item.layer, feature, resolution)];
            }
        });

        // Read GeoJSON options
        var readFeaturesOptions = {
            dataProjection: 'EPSG:' + item.layer.projection.srid,
            featureProjection: 'EPSG:' + srid
        };

        function loadFeatures(extent, resolution) {
            const updateUrl = url + '?bbox='+extent.join(',')
                + '&srs=' + srid
                + '&resolution=' + resolution;
            fetch(updateUrl).then(res => res.json())
            .then((geojson) => {
                layer.getSource().clear();
                var features = format.readFeatures(geojson, readFeaturesOptions);
                layer.getSource().addFeatures(features);
            }).catch(err => {
                console.log(err);
            });
        }

        // Update layer
        this.olMap.on('moveend', () => {
            var resolution = this.olMap.getView().getResolution();
            if (resolution < parseFloat(item.layer.min_resolution)
                || resolution > parseFloat(item.layer.max_resolution)
            ) return;
            var extent = this.olMap.getView().calculateExtent(this.olMap.getSize());
            loadFeatures(extent, resolution);
        });
        return layer;
    };

    /**
     * Create WMS layer
     *
     * @param {Object} item
     * @returns {Map.ol.layer.Tile}
     */
    createLayerWMS(item) {
        let config = item.layer;
        const srid = this.props.projection.srid
        var layer = new OlTileLayer({
            visible: item.visible,
            source: new OlTileWMS({
                url: config.wms_url,
                serverType: config.wms_servertype,
                params: {
                    'LAYERS': config.wms_layers,
                    'TILED': config.wms_tiled,
                    'VERSION': config.wms_version,
                    'SRS': 'EPSG:' + config.projection.srid,
                    'CRS': 'EPSG:' + srid
                }
            })
        });
        const legendUrl = this.createLegendUrl(config.wms_url, config.wms_layers, srid)
        layer.set('legendURL', legendUrl);
        return layer;
    };

    /**
     * Create WFS layer
     *
     * @param {Object} item
     * @returns {OlVector}
     */
    createLayerWFS(item) {
        var me = this, url, style, srid = this.props.projection.srid;
        const gmlformat = (item.layer.wfs_version === '1.0.0' ?
            new OlGML2() : new OlGML3());
        const format = new OlWFS({ 'gmlFormat': gmlformat });
        url = item.layer.wfs_url + (item.layer.wfs_url.indexOf('?') > -1 ? '' : '?');

        var readFeaturesOptions = {
            dataProjection: 'EPSG:' + item.layer.projection.srid,
            featureProjection: 'EPSG:' + srid
        }

        // Add projection
        this.addLayerProjection(item.layer);

        // Create layer
        var layer = new OlVectorLayer({
            visible: item.visible,
            source: new OlVectorSource(),
            style: function(feature, resolution) {
                style = me.createStyle(item.layer, feature, resolution);
                return [style];
            }
        });

        // Layer updater
        var params = [
            'SERVICE=WFS',
            'VERSION=' + item.layer.wfs_version,
            'REQUEST=GetFeature',
            'typename=' + item.layer.wfs_typename,
            'srsname=EPSG:' + srid
        ];
        function loadFeatures(extent, resolution, projection) {
            const updateUrl = url + '&' + params.join('&')
                + '&BBOX=' + extent.join(',') + ',EPSG:' + srid;
            fetch(updateUrl).then(res => res.text())
            .then((geojson) => {
                layer.getSource().clear();
                var features = format.readFeatures(geojson, readFeaturesOptions);
                layer.getSource().addFeatures(features);
            }).catch(err => {
                console.log(err);
            });
        }

        // Update layer
        this.olMap.on('moveend', () => {
            var resolution = this.olMap.getView().getResolution();
            if (resolution < parseFloat(item.layer.min_resolution)
                || resolution > parseFloat(item.layer.max_resolution)
            ) return;
            var extent = this.olMap.getView().calculateExtent(this.olMap.getSize());
            loadFeatures(extent, resolution);
        });
        return layer;
    };

    /**
     * Create feature style
     *
     * @param {Object} item
     * @param {ol.Feature} feature
     * @param {float} resolution
     * @returns {Map.ol.style.Style}
     */
    createStyle(item, feature, resolution)
    {
        var image = {src: ''};

        // Get static style
        var style = new OlStyle({
            fill: new OlFill({ color: item.ol_style_static_fill_color || 'rgba(0,0,0,0.5)' }),
            stroke: new OlStroke({
                width: parseInt((item.ol_style_static_stroke_width ? item.ol_style_static_stroke_width : 2), 10),
                color: (item.ol_style_static_stroke_color ? item.ol_style_static_stroke_color : '#000000')
            }),
            image: new OlCircle({
                radius: parseInt((item.ol_style_static_stroke_width ? item.ol_style_static_stroke_width : 2), 10),
                fill: new OlFill({
                  color: (item.ol_style_static_fill_color ? item.ol_style_static_fill_color : 'rgba(0,0,0,0.5)')
                })
            })
        });
        if (item.ol_style_static_icon) {
            image.src = item.ol_style_static_icon;
            image.src = this.props.baseURL + '/storage/layer/' + item.id + '/' + image.src;
        }

        // Get feature style
        if (item.ol_style_field_fill_color) {
            style = new OlStyle({
                fill: new OlFill({ color: feature.get(item.ol_style_field_fill_color) }),
                stroke: new OlStroke({
                    width: parseInt(feature.get(item.ol_style_field_stroke_width), 10),
                    color: feature.get(item.ol_style_field_stroke_color)
                }),
                image: new OlCircle({
                    radius: parseInt(feature.get(item.ol_style_field_stroke_width), 10),
                    fill: new OlFill({
                        color: feature.get(item.ol_style_field_fill_color)
                    })
                })
            });
        }
        if (item.ol_style_field_icon) {
            image.src = feature.get(item.ol_style_field_icon);
            image.src = this.props.baseURL + '/storage/layer/' + item.id + '/icons/' + image.src;
        }
        if (image.src !== '') {
            style = new OlStyle({
                image: new OlIcon(image)
            });
        }

        // TODO
        /*
        if (imagem && item.text) {
            style = new ol.style.Style({
                image: new ol.style.Icon(imagem),
                text: new ol.style.Text({
                    font: item.text.font,
                    textAlign: item.text.textAlign,
                    fill: new ol.style.Fill(item.text.fill),
                    stroke: new ol.style.Stroke(item.text.stroke),
                    textBaseline: item.text.textBaseline,
                    text: feature.get(item.text.text)
                })
            });
        }*/
        return style;
    };

    /*
    geoPackageToGeoJSON(data, geopackage_table, cb) {
        var FeatureCollection = {
            type: "FeatureCollection",
            features: []
        }
        var uInt8Array = new Uint8Array(data);
        GeoPackage.openGeoPackageByteArray(uInt8Array, function(err, geoPackage) {

            // get the info for the first table
            geoPackage.getFeatureDaoWithTableName(geopackage_table, function(err, featureDao) {
                featureDao.queryForAll(function(err, result) {
                    result.forEach(row => {
                        var feature = featureDao.getFeatureRow(row);
                        var geometry = feature.getGeometry();
                        if (geometry) {
                            var geoJson = geometry.geometry.toGeoJSON();
                            geoJson.properties = Object.assign({}, feature.values);
                            delete geoJson.properties[feature.getGeometryColumn().name];
                            FeatureCollection.features.push(geoJson);
                        }
                    });
                    cb(FeatureCollection);
                });
            });
        });
    }
    */
    
    /**
     * Create legend URL
     *
     * @param {string} url
     * @param {string} layer
     * @param {string} srs
     * @returns {String}
     */
    createLegendUrl(url, layer, srs) {
        var finalurl = url;
        finalurl += finalurl.indexOf('?') === -1 ? '?' : '';
        return finalurl + '&' + ([
            'SERVICE=WMS',
            'VERSION=1.1.1',
            'REQUEST=GetLegendGraphic',
            'FORMAT=image%2Fpng',
            'SRS=EPSG:' + srs,
            'CRS=EPSG:' + srs,
            'LAYER=' + layer
        ].join('&'));
    };

    render() {
        const { width, height } = this.props
        return (
            <div>
                <div id="map" className="map"
                    style={{width: width || '100%', height: height || '280px'}}>
                </div>
            </div>
        );
    }
}

export default Map;
