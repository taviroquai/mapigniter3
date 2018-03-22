import React, { Component } from 'react';
import { Form, Grid, Button, Icon } from 'semantic-ui-react';

class InputKML extends Component {

    render() {
        var { form, onSelectFile, onInputChange } = this.props
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field>
                        <label>KML File</label>
                        <input name="upload"
                            id="fileImport"
                            placeholder="Escolha o ficheiro"
                            type="file"
                            accept="application/vnd.google-earth.kml+xml"
                            onChange={(e) => e.target.files.length && onSelectFile(e, {name: 'kml_filename', type: 'kml', value: e.target.files[0]})}
                            style={{display: 'none'}}
                        />

                    { form.kml_filename ? (
                            <label>
                                <Button icon color="red" size="mini"
                                    onClick={(e) => onInputChange(e, {name: 'kml_filename', value: ''})}>
                                    <Icon name="remove" />
                                </Button>{' '}
                                {form.kml_filename}
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

export default InputKML;
