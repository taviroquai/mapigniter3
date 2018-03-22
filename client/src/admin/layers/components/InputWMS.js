import React, { Component } from 'react';
import { Form, Button, Grid, Dropdown } from 'semantic-ui-react';

class FormTabBasic extends Component {

    render() {
        var { form, onInputChange, onDropdownChange, onGetWMSCapabilities, wms_options } = this.props
        const serverOptions = [
            { key: 'carmentaserver', value: 'carmentaserver', text: 'carmentaserver' },
            { key: 'geoserver', value: 'geoserver', text: 'geoserver' },
            { key: 'mapserver', value: 'AerialWitmapserverhLabels', text: 'mapserver' },
            { key: 'qgis', value: 'qgis', text: 'qgis' }
        ];
        const versionOptions = [
            { key: '1', value: '1.1.0', text: '1.1.0' },
            { key: '2', value: '1.3.0', text: '1.3.0' }
        ];
        const tiledOptions = [
            { key: '1', value: '1', text: 'Yes' }
        ];
        var layersOptions = wms_options ? wms_options
            : (form.wms_layers ? form.wms_layers.split(',').map(item => {
                return { key: item, value: item, text: item}
            }) : []);
        var wms_layers = !form.wms_layers ? [] :
            typeof form.wms_layers === 'string' ?
                form.wms_layers.split(',') : form.wms_layers;
        return (

            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>URL</label>
                        <Form.Input name="wms_url" placeholder='URL'
                            value={form.wms_url || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Server Type</label>
                        <Dropdown placeholder='Server Type'
                            name="wms_servertype"
                            fluid search selection
                            options={serverOptions}
                            value={form.wms_servertype}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={4}>
                    <Form.Field required>
                        <label>Version</label>
                        <Dropdown placeholder='Version'
                            name="wms_version"
                            fluid search selection
                            options={versionOptions}
                            value={form.wms_version}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={4}>
                    <Form.Field required>
                        <label>Tiled</label>
                        <Dropdown placeholder='Tiled'
                            name="wms_tiled"
                            fluid search selection
                            options={tiledOptions}
                            value={''+form.wms_tiled}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={4}>
                    <Form.Field required>
                        <label>Get Capabilities</label>
                        <Button onClick={onGetWMSCapabilities}>
                            Get Capabilities
                        </Button>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>Layers</label>
                        <Dropdown placeholder='Attributes'
                            name="postgis_attributes"
                            fluid multiple search selection
                            options={layersOptions}
                            value={wms_layers}
                            onChange={(e, item) => onDropdownChange(e, {name: 'wms_layers', value: item.value.join(',')})}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default FormTabBasic;
