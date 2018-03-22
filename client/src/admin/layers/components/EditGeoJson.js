// TODO: refactor all this code
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Header, Form } from 'semantic-ui-react';
import OlMap from 'ol/map';
import OlView from 'ol/view';
import OlVectorLayer from 'ol/layer/vector';
import OlVectorSource from 'ol/source/vector';
import OlTileLayer from 'ol/layer/tile';
import OlXYZ from 'ol/source/xyz';
import OlGeoJSON from 'ol/format/geojson';
import OlSelect from 'ol/interaction/select';
import OlModify from 'ol/interaction/modify';
import OlDraw from 'ol/interaction/draw';
import OlSnap from 'ol/interaction/snap';
import OlCondition from 'ol/events/condition';
import OlStyle from 'ol/style/style';
import OlStroke from 'ol/style/stroke';
import OlFill from 'ol/style/fill';
import OlCircle from 'ol/style/circle';
import 'ol/ol.css';

class PublicMap extends Component {

    static propTypes = {
        srid: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        attributes: PropTypes.string.isRequired,
        geojson: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);

        this.state = {mode: 'select', showAttributes: false};

        this.style = new OlStyle({
            fill: new OlFill({ color: '#000000' }),
            stroke: new OlStroke({
                width: 2,
                color: '#000000'
            }),
            image: new OlCircle({
                radius: 2,
                fill: new OlFill({
                  color: '#000000'
                })
            })
        });

        this.vectors = new OlVectorSource({
            features: []
        });

        this.layer = new OlVectorLayer({
            id: 1,
            name: 'Vectors',
            visible: true,
            source: this.vectors,
            style: [this.style]
        });

        const baseLayer = new OlTileLayer({
            source: new OlXYZ({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });

        this.olMap = new OlMap({
            target: null,
            layers: [baseLayer, this.layer],
            view: new OlView({
                center: [0,0],
                zoom: 2
            })
        });

        // Data format
        this.format = new OlGeoJSON();
        this.editing = null;
    }

    setupInteractions(props) {
        var me = this;
        if (this.select) this.olMap.removeInteraction(this.select);
        if (this.modify) this.olMap.removeInteraction(this.modify);
        if (this.draw) this.olMap.removeInteraction(this.draw);
        if (this.snap) this.olMap.removeInteraction(this.snap);
        if (this.state.mode === 'create') {
            this.draw = new OlDraw({
                source: this.vectors,
                type: props.type || 'Point'
            });
            this.olMap.addInteraction(this.draw);
            this.snap = new OlSnap({source: this.vectors});
            this.olMap.addInteraction(this.snap);
            this.draw.on('drawend', (e) => {
                setTimeout(() => {
                    props.onChange(e, me.format.writeFeatures(me.vectors.getFeatures()));
                }, 50);
            });
        } else if (this.state.mode === 'modify') {
            var modify = new OlModify({
                source: this.vectors,
                deleteCondition: function(event) {
                    return OlCondition.shiftKeyOnly(event) &&
                        OlCondition.singleClick(event);
                }
            });
            this.olMap.addInteraction(modify);
            modify.on('modifyend', (e) => {
                props.onChange(e, this.format.writeFeatures(this.vectors.getFeatures()));
            });
        } else {
            this.select = new OlSelect({
                layers: [this.layer],
                style: [this.style]
            });
            this.olMap.addInteraction(this.select);
            this.select.on('select', function(e) {
                me.editing = e.selected[0];
                me.setState({showAttributes: true});
            });
        }
    }

    /**
     * Mount openlayers map on DOM
     * @return {[type]} [description]
     */
    componentDidMount() {
        this.olMap.setTarget(document.getElementById('map'));
        this.olMap.getView().setZoom(1);
        const srid = this.props.srid;
        if (this.props.geojson) {
            var features = this.format.readFeatures(this.props.geojson, {
                dataProjection: 'EPSG:'+srid,
                featureProjection: 'EPSG:3857'
            });
            this.vectors.addFeatures(features);
        }
    }

    onChangeMode(e) {
        e.preventDefault();
        this.setState({mode: e.target.value});
    }

    handleCloseAttributes(e) {
        this.setState({showAttributes: false});
    }

    onChangeAttribute(name, value) {
        var properties = this.editing.getProperties();
        properties[name] = value;
        this.editing.setProperties(properties);
        this.props.onChange(null, this.format.writeFeatures(this.vectors.getFeatures()));
    }

    // Render map dom
    render() {
        this.setupInteractions(this.props);
        var attributes = this.props.attributes ? this.props.attributes.split(',') : [];
        return (
            <div>
                <Button.Group>
                    <Button value="select"
                        active={this.state.mode === 'select'}
                        onClick={this.onChangeMode.bind(this)}>Edit Attributes</Button>
                    <Button value="modify"
                        active={this.state.mode === 'modify'}
                        onClick={this.onChangeMode.bind(this)}>Modify Geometry</Button>
                    <Button value="create"
                        active={this.state.mode === 'create'}
                        onClick={this.onChangeMode.bind(this)}>Draw New Feature</Button>
                </Button.Group>
                <div id="map" className="map" style={{width: '100%', height: '280px'}}></div>
                <Modal
                    open={this.state.showAttributes}
                    onClose={this.handleCloseAttributes.bind(this)}
                    size="small">
                    <Header icon="browser" content="Attributes" />
                    <Modal.Content>
                        <Form>
                            { this.editing && attributes.length ? attributes.map((item) => (
                                <Form.Field key={item}>
                                    <label>{item}</label>{' '}
                                    <Form.Input size="mini" value={this.editing.getProperties()[item] || ''}
                                    onChange={(e) => this.onChangeAttribute(item, e.target.value)} />
                                </Form.Field>
                            )) : <p>No attributes found.</p> }
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleCloseAttributes.bind(this)}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default PublicMap;
