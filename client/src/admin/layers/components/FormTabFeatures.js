import React, { Component } from 'react';
import { Form, Grid, TextArea } from 'semantic-ui-react';

class FormTabVectors extends Component {

    render() {
        var { form, onInputChange } = this.props
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Form.Field required>
                            <label>Feature Info Template</label>
                            <TextArea name="feature_info_template"
                                placeholder='Feature Info Template'
                                value={form.feature_info_template || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Form.Field required>
                            <label>Searchable Fields</label>
                            <Form.Input name="search"
                                placeholder='Searchable Fields'
                                value={form.search || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default FormTabVectors;
