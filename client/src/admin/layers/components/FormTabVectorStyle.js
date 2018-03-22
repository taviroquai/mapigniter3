import React, { Component } from 'react';
import { Form, Grid } from 'semantic-ui-react';

class FormTabVectorStyle extends Component {

    render() {
        var { form, onInputChange } = this.props
        return (
            <div>
                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Form.Field required>
                            <label>Static Icon</label>
                            <Form.Input name="ol_style_static_icon" placeholder='Static Icon'
                                value={form.ol_style_static_icon || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Static Fill Color</label>
                            <Form.Input name="ol_style_static_fill_color" placeholder='Static Fill Color'
                                value={form.ol_style_static_fill_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Static Stroke Color</label>
                            <Form.Input name="ol_style_static_stroke_color" placeholder='Static Stroke Color'
                                value={form.ol_style_static_stroke_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Static Stroke Color</label>
                            <Form.Input name="ol_style_static_stroke_color" placeholder='Static Stroke Color'
                                value={form.ol_style_static_stroke_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Static Stroke Width</label>
                            <Form.Input name="ol_style_static_stroke_width" placeholder='Static Stroke Width'
                                value={form.ol_style_static_stroke_width || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid>

                <Grid>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <Form.Field required>
                            <label>Field for Icon</label>
                            <Form.Input name="ol_style_field_icon" placeholder='Static Icon'
                                value={form.ol_style_field_icon || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Field for Fill Color</label>
                            <Form.Input name="ol_style_field_fill_color" placeholder='Field for Fill Color'
                                value={form.ol_style_field_fill_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Field for Stroke Color</label>
                            <Form.Input name="ol_style_field_stroke_color" placeholder='Field for Stroke Color'
                                value={form.ol_style_field_stroke_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Field for Stroke Color</label>
                            <Form.Input name="ol_style_field_stroke_color" placeholder='Field for Stroke Color'
                                value={form.ol_style_field_stroke_color || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={16} computer={4}>
                        <Form.Field required>
                            <label>Field for Stroke Width</label>
                            <Form.Input name="ol_style_field_stroke_width" placeholder='Field for Stroke Width'
                                value={form.ol_style_field_stroke_width || ''}
                                onChange={onInputChange}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid>

            </div>
        );
    }
}

export default FormTabVectorStyle;
