import React, { Component } from 'react';
import { Form, Grid, Icon, Button } from 'semantic-ui-react';

class InputGPX extends Component {

    render() {
        var { form, onSelectFile, onInputChange } = this.props
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field>
                        <label>GPX File</label>
                        <input name="upload"
                            id="fileImport"
                            placeholder="Escolha o ficheiro"
                            type="file"
                            accept="application/gpx+xml"
                            onChange={(e) => e.target.files.length && onSelectFile(e, {name: 'gpx_filename', type: 'gpx', value: e.target.files[0]})}
                            style={{display: 'none'}}
                        />

                        { form.gpx_filename ? (
                            <label>
                                <Button icon color="red" size="mini"
                                    onClick={(e) => onInputChange(e, {name: 'gpx_filename', value: ''})}>
                                    <Icon name="remove" />
                                </Button>{' '}
                                {form.gpx_filename}
                            </label>
                        ) : (
                            <label htmlFor="fileImport" className="ui huge primary button">
                                <i className="ui upload icon"></i>
                                Carregar ficheiro
                            </label>
                        )}
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputGPX;
