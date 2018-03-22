import React, { Component } from 'react';
import { Form, Grid, Dropdown } from 'semantic-ui-react';

class InputBing extends Component {

    render() {
        var { form, onInputChange, onDropdownChange } = this.props
        const layerOptions = [
            { key: 'Road', value: 'Road', text: 'Road' },
            { key: 'Aerial', value: 'Aerial', text: 'Aerial' },
            { key: 'AerialWithLabels', value: 'AerialWithLabels', text: 'AerialWithLabels' },
            { key: 'collinsBart', value: 'collinsBart', text: 'collinsBart' },
            { key: 'ordnanceSurvey', value: 'ordnanceSurvey', text: 'ordnanceSurvey' }
        ];
        return (
            <Grid>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>API Key</label>
                        <Form.Input name="bing_key" placeholder='Bing Key'
                            value={form.bing_key || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={8}>
                    <Form.Field required>
                        <label>Imagery Set</label>
                        <Dropdown placeholder='Imagery Set' fluid search selection
                            name="bing_imageryset"
                            options={layerOptions}
                            value={form.bing_imageryset || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputBing;
