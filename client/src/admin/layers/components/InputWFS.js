import React, { Component } from 'react';
import { Form, Button, Grid, Dropdown } from 'semantic-ui-react';

class InputWFS extends Component {

    render() {
        var { form, onInputChange, onDropdownChange, onGetWFSCapabilities, wfs_options } = this.props
        const versionOptions = [
            { key: '1', value: '1.0.0', text: '1.0.0' },
            { key: '2', value: '1.1.0', text: '1.1.0' }
        ];
        var typenameOptions = wfs_options ? wfs_options
            : (form.wfs_typename ? [{
                key: form.wfs_typename,
                value: form.wfs_typename,
                text: form.wfs_typename
            }] : []);
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>URL</label>
                        <Form.Input name="wfs_url" placeholder='URL'
                            value={form.wfs_url || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={12}>
                    <Form.Field required>
                        <label>Version</label>
                        <Dropdown placeholder='Version'
                            name="wfs_version"
                            fluid search selection
                            options={versionOptions}
                            value={form.wfs_version}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={4}>
                    <Form.Field>
                        <label>Get Capabilities</label>
                        <Button onClick={onGetWFSCapabilities}>Get Capabilities</Button>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>Typename</label>
                        <Dropdown placeholder='Version'
                            name="wfs_typename"
                            fluid search selection
                            options={typenameOptions}
                            value={form.wfs_typename}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputWFS;
