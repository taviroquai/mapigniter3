import React, { Component } from 'react';
import { Form, Grid, Dropdown, TextArea } from 'semantic-ui-react';
import EditGeoJson from './EditGeoJson';

class InputGeoJSON extends Component {

    render() {
        var { form, onInputChange, onDropdownChange } = this.props
        const geomTypeOptions = [
            { key: 'Point', value: 'Point', text: 'Point' },
            { key: 'LineString', value: 'LineString', text: 'LineString' },
            { key: 'Polygon', value: 'Polygon', text: 'Polygon' }
        ];
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                    <Form.Field required>
                        <label>Geometry Type</label>
                        <Dropdown placeholder='Geometry Type' fluid search selection
                            name="geojson_geomtype"
                            options={geomTypeOptions}
                            value={form.geojson_geomtype || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                    <Form.Field required>
                        <label>Attributes</label>
                        <Form.Input name="geojson_attributes" placeholder='Attributes'
                            value={form.geojson_attributes || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <EditGeoJson
                        srid={form.projection ? ''+form.projection.srid : '3857'}
                        type={form.geojson_geomtype}
                        geojson={form.geojson_features}
                        attributes={form.geojson_attributes}
                        onChange={(e, geojson) => onInputChange(e, {name: 'geojson_features', value: geojson})} />
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <TextArea
                        name="geojson_features"
                        value={form.geojson_features}
                        onChange={onInputChange} />
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputGeoJSON;
