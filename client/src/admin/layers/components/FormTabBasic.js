import React, { Component } from 'react';
import { Form, Grid, Dropdown } from 'semantic-ui-react';
import ImageUpload from '../../components/ImageUpload';
import Wysiwyg from '../../components/Wysiwyg';
import InputBing from './InputBing';
import InputOSM from './InputOSM';
import InputWMS from './InputWMS';
import InputWFS from './InputWFS';
import InputGPX from './InputGPX';
import InputKML from './InputKML';
import InputPostGIS from './InputPostGIS';
import InputGeoJSON from './InputGeoJSON';
import InputGeoPackage from './InputGeoPackage';

class FormTabBasic extends Component {

    render() {
        var { form, types, projections, onInputChange, onDropdownChange, onSelectImage } = this.props
        const publishOptions = [
            { key: '1', value: 'true', text: 'Yes' },
            { key: '2', value: 'false', text: 'No' },
        ];
        types = types || []
        types = types.map((item) => {
            return {value: item.key, key: item.id, text: item.label};
        });
        projections = projections || []
        projections = projections.map((item) => {
            return {value: item.id, key: item.id, text: item.srid};
        });
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={8}>
                        <Form.Field required>
                            <label>Title</label>
                            <Form.Input name="title" placeholder='Title'
                                value={form.title || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field required>
                            <label>SEO Slug (system wide)</label>
                            <Form.Input name="seo_slug" placeholder='SEO Slug'
                                value={form.seo_slug || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field required>
                            <label>Published</label>
                            <Dropdown placeholder='Published' fluid search selection
                                name="publish"
                                options={publishOptions}
                                value={''+form.publish}
                                onChange={onDropdownChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={12}>
                        <Form.Field required>
                            <label>Description</label>
                            <Wysiwyg content={form.description}
                                onChange={data => onInputChange(null, {name: 'description', value: data})}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field>
                            <label>Image</label>
                            <ImageUpload name="image"
                                src={form.image && form.id ? this.props.serverUrl+'/'+form.id+'/'+form.image : ''}
                                onSelectFile={onSelectImage}
                                onClear={e => onInputChange(e, {name: 'image', value: ''})}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field required>
                            <label>Layer Type</label>
                            <Dropdown placeholder='Layer Type' fluid search selection
                                name="type"
                                options={types}
                                value={form.type || ''}
                                onChange={onDropdownChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field required>
                            <label>Projection</label>
                            <Dropdown placeholder='Projection' fluid search selection
                                name="projection_id"
                                options={projections}
                                value={parseInt(form.projection_id, 10) || ''}
                                onChange={onDropdownChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field>
                            <label>Min Resolution</label>
                            <Form.Input name="min_resolution" placeholder='Min Resolution'
                                value={form.min_resolution || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <Form.Field>
                            <label>Max Resolution</label>
                            <Form.Input name="max_resolution" placeholder='Max Resolution'
                                value={form.max_resolution || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid>

                { form.type === 'BING' && <InputBing {...this.props} /> }
                { form.type === 'OSM' && <InputOSM {...this.props} /> }
                { form.type === 'WMS' && <InputWMS {...this.props} /> }
                { form.type === 'WFS' && <InputWFS {...this.props} /> }
                { form.type === 'GPX' && <InputGPX {...this.props} /> }
                { form.type === 'KML' && <InputKML {...this.props} /> }
                { form.type === 'POSTGIS' && <InputPostGIS {...this.props} /> }
                { form.type === 'GEOJSON' && <InputGeoJSON {...this.props} /> }
                { form.type === 'GEOPACKAGE' && <InputGeoPackage {...this.props} /> }

            </div>
        );
    }
}

export default FormTabBasic;
