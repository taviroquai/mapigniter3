import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message, Button, Segment, Grid, Dropdown } from 'semantic-ui-react';
import Layers from '../../maplayers/components/List';
import ImageUpload from '../../components/ImageUpload';
import Wysiwyg from '../../components/Wysiwyg';
import Map from './Map';


class ItemForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: false
        }
    }

    setImagePreview(file) {
        var me = this, reader = new FileReader();
        reader.onload = function() {
            me.setState({image: reader.result})
        };
        reader.readAsDataURL(file);
    }

    render() {
        var { error, form, projections, onInputChange, onDropdownChange,
            onSelectFile, onSubmit, onCreate, serverUrl } = this.props
        projections = projections || []
        projections = projections.map((item) => {
            return {value: ''+item.id, key: item.id, text: item.srid};
        });
        const publishOptions = [
            { key: '1', value: 'true', text: 'Yes' },
            { key: '2', value: 'false', text: 'No' },
        ];
        return (
            <div className="ui main container">

                <Form error={!!error} onSubmit={onSubmit}>

                    <Segment basic clearing floated="right">
                        <Button type='submit'>Save</Button>
                        { onCreate ? (
                            <Button onClick={onCreate}>New</Button>
                        ) : null }
                        <Link to="/admin/map" className="ui button right aligned">
                            Cancel
                        </Link>
                    </Segment>

                    <h1 className="ui header">Map</h1>

                    <Message error
                        header='Error'
                        content={error}
                    />

                    <div style={{clear: 'both'}}>
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={8}>
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
                                    <label>SEO Slug (system)</label>
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
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Projection</label>
                                    <Dropdown placeholder='Projection' fluid search selection
                                        name="projection_id"
                                        options={projections}
                                        value={''+form.projection_id || ''}
                                        onChange={onDropdownChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Center X</label>
                                    <Form.Input name="coordx" placeholder='Center X'
                                        value={form.coordx || 0}
                                        onChange={onInputChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Center Y</label>
                                    <Form.Input name="coordy" placeholder='Center Y'
                                        value={form.coordy || 0}
                                        onChange={onInputChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Default Zoom</label>
                                    <Form.Input name="zoom" placeholder='Default Zoom'
                                        value={form.zoom || ''}
                                        onChange={onInputChange}
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
                                        src={form.image && form.id ? serverUrl+'/'+form.id+'/'+form.image : ''}
                                        onSelectFile={onSelectFile}
                                        onClear={e => onInputChange(e, {name: 'image', value: ''})}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid>
                    </div>

                    { form.id ? (
                        <div style={{clear: 'both'}}>
                            <Grid>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <h4>Preview</h4>
                                    { form.id ? <Map {...form} height="400px" /> : null }
                                </Grid.Column>
                                <Grid.Column mobile={16} tablet={8} computer={8}>
                                    <Layers { ...this.props } />
                                </Grid.Column>
                            </Grid>
                        </div>
                    ) : null }

                </Form>
            </div>
        );
    }
}

export default ItemForm;
