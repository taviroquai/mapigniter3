import React, { Component } from 'react';
import { Form, Grid, Button, Dropdown } from 'semantic-ui-react';

class InputPostGIS extends Component {

    render() {
        var { form, onInputChange, onDropdownChange, onPostgisConnect, postgis } = this.props
        var schemaOptions = form.id ? [{
            key: form.postgis_schema,
            value: form.postgis_schema,
            text: form.postgis_schema
        }] : [];
        var tableOptions = form.id ? [{
            key: form.postgis_table,
            value: form.postgis_table,
            text: form.postgis_table
        }] : [];
        var fieldOptions = form.id ? [{
            key: form.postgis_field,
            value: form.postgis_field,
            text: form.postgis_field
        }] : [];
        schemaOptions = postgis ? Object.keys(postgis).map(item => {
            return {key: item, value: item, text: item}
        }) : schemaOptions;
        tableOptions = postgis && postgis[form.postgis_schema] ?
            Object.keys(postgis[form.postgis_schema]).map(item => {
                return {key: item, value: item, text: item}
            }) : tableOptions;
        fieldOptions = postgis && postgis[form.postgis_schema][form.postgis_table] ?
            Object.keys(postgis[form.postgis_schema][form.postgis_table]).map(item => {
                const name = postgis[form.postgis_schema][form.postgis_table][item]['name']
                return { key: name, value: name, text: name}
            }) : fieldOptions;
        var postgis_attributes = !form.postgis_attributes ? [] :
            typeof form.postgis_attributes === 'string' ?
                form.postgis_attributes.split(',') : form.postgis_attributes;
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Host</label>
                        <Form.Input name="postgis_host" placeholder='Host'
                            value={form.postgis_host || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>DB Name</label>
                        <Form.Input name="postgis_dbname" placeholder='DB Name'
                            value={form.postgis_dbname || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={2}>
                    <Form.Field required>
                        <label>Postgis User</label>
                        <Form.Input name="postgis_user" placeholder='Postgis User'
                            value={form.postgis_user || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={2}>
                    <Form.Field>
                        <label>Password</label>
                        <Form.Input name="postgis_pass" placeholder='Postgis Password'
                            type="password"
                            value={form.postgis_pass || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={2}>
                    <Form.Field>
                        <label>Port</label>
                        <Form.Input name="postgis_port" placeholder='Port'
                            value={form.postgis_port || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={8} tablet={8} computer={2}>
                    <Form.Field>
                        <label>Connect</label>
                        <Button onClick={onPostgisConnect}>Connect</Button>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Schema</label>
                        <Dropdown placeholder='Schema' fluid search selection
                            name="postgis_schema"
                            options={schemaOptions}
                            value={form.postgis_schema || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Table / View</label>
                        <Dropdown placeholder='Table / View' fluid search selection
                            name="postgis_table"
                            options={tableOptions}
                            value={form.postgis_table || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Field for Label</label>
                        <Dropdown placeholder='Field for Label' fluid search selection
                            name="postgis_field"
                            options={fieldOptions}
                            value={form.postgis_field || ''}
                            onChange={onDropdownChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <Form.Field required>
                        <label>Attributes</label>
                        <Dropdown placeholder='Attributes'
                            name="postgis_attributes"
                            fluid multiple search selection
                            options={fieldOptions}
                            value={postgis_attributes}
                            onChange={(e, item) => onDropdownChange(e, {name: 'postgis_attributes', value: item.value.join(',')})}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputPostGIS;
