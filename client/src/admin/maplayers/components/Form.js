import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message, Button, Segment, Grid, Dropdown, Checkbox } from 'semantic-ui-react';

class ItemForm extends Component {

    render() {
        var { error, form, maps, layers, groups, onDropdownChange, onCheckboxChange, onSubmit, onCreate } = this.props
        maps = maps || []
        maps = maps.map((item) => {
            return {value: item.id, key: item.id, text: item.title};
        });
        layers = layers || []
        layers = layers.map((item) => {
            return {value: item.id, key: item.id, text: item.title};
        });
        groups = groups || []
        groups = groups.filter(item => item.layer.type === 'GROUP')
        groups = groups.map((item) => {
            return {value: item.layer.id, key: item.layer.id, text: item.layer.title};
        });
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

                    <h1 className="ui header">Map Layer</h1>

                    <Message error
                        header='Error'
                        content={error}
                    />

                    <div style={{clear: 'both'}}>
                        <Grid>
                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <Form.Field required>
                                    <label>Layer</label>
                                    <Dropdown placeholder='Layer' fluid search selection
                                        name="layer_id"
                                        options={layers}
                                        value={form.layer_id || ''}
                                        onChange={onDropdownChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Is Base Layer</label>
                                    <Checkbox name="baselayer" toggle
                                        checked={form.baselayer || false}
                                        onChange={onCheckboxChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={4}>
                                <Form.Field required>
                                    <label>Is Visible</label>
                                    <Checkbox name="visible" toggle
                                        checked={form.visible || false}
                                        onChange={onCheckboxChange}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column mobile={16} tablet={8} computer={8}>
                                <Form.Field required>
                                    <label>Group (Parent)</label>
                                    <Dropdown placeholder='Layer Group' fluid search selection
                                        name="parent_id"
                                        options={groups}
                                        value={form.parent_id || ''}
                                        onChange={onDropdownChange}
                                    />
                                </Form.Field>
                            </Grid.Column>

                            <Grid.Column mobile={16} tablet={16} computer={16}>
                                <Form.Field required>
                                    <label>Map</label>
                                    <Dropdown placeholder='Map' fluid search selection
                                        disabled={!!form.map_id}
                                        name="map_id"
                                        options={maps}
                                        value={form.map_id || ''}
                                        onChange={onDropdownChange}
                                    />
                                </Form.Field>
                            </Grid.Column>

                        </Grid>
                    </div>

                </Form>
            </div>
        );
    }
}

export default ItemForm;
