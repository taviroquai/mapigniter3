import React, { Component } from 'react';
import { Form, Grid, Dropdown } from 'semantic-ui-react';

class FormTabBasic extends Component {

    render() {
        var { form, onDropdownChange } = this.props
        const layerOptions = [
            { key: 'sat', value: 'sat', text: 'Sattelite' }
        ];
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>OSM Layer</label>
                        <Dropdown placeholder='Layer' fluid search selection
                            name="mapquest_layer"
                            options={layerOptions}
                            value={form.mapquest_layer || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default FormTabBasic;
