import React, { Component } from 'react';
import { Form, Grid, Button, Icon } from 'semantic-ui-react';

class InputGeoPackage extends Component {

    render() {
        var { form, onInputChange, onSelectFile } = this.props
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field>
                        <label>GeoPackage File</label>
                        <input name="upload"
                            id="fileImport"
                            placeholder="Escolha o ficheiro"
                            type="file"
                            accept="application/x-sqlite3"
                            onChange={(e) => e.target.files.length && onSelectFile(e, {name: 'geopackage_filename', type: 'gpkg', value: e.target.files[0]})}
                            style={{display: 'none'}}
                        />

                        { form.geopackage_filename ? (
                            <label>
                                <Button icon color="red" size="mini"
                                    onClick={(e) => onInputChange(e, {name: 'geopackage_filename', value: ''})}>
                                    <Icon name="remove" />
                                </Button>{' '}
                                {form.geopackage_filename}
                            </label>
                        ) : (
                            <label htmlFor="fileImport" className="ui huge primary button">
                                <i className="ui upload icon"></i>
                                Carregar ficheiro
                            </label>
                        )}
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={8}>
                    <Form.Field required>
                        <label>Table / View</label>
                        <Form.Input name="geopackage_table" placeholder='Table / View'
                            value={form.geopackage_table || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={16}>
                    <Form.Field required>
                        <label>Attributes</label>
                        <Form.Input name="geopackage_fields" placeholder='Attributes'
                            value={form.geopackage_fields || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid>
        );
    }
}

export default InputGeoPackage;
