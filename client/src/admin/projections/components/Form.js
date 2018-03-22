import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message, TextArea, Button } from 'semantic-ui-react';

class List extends Component {

    render() {
        var { form, error, onSubmit, onInputChange, onCreate } = this.props
        return (
            <div className="ui main text container">
                <h1 className="ui header">Projection</h1>

                <Form error={!!error} onSubmit={onSubmit}>
                    <Form.Field required>
                        <label>SRID (system wide)</label>
                        <Form.Input name="srid" placeholder='SRID'
                            disabled={!!form.id}
                            value={form.srid || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Proj4 Params</label>
                        <TextArea placeholder='Proj4 Params'
                            name="proj4_params"
                            value={form.proj4_params || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>

                    <Form.Field required>
                        <label>Extent</label>
                        <Form.Input name="extent" placeholder='-20026376.39 -20048966.10 20026376.39 20048966.10'
                            value={form.extent || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>

                    <Message error
                        header='Error'
                        content={error}
                    />

                    <Button type='submit'>Save</Button>
                    { onCreate ? (
                        <Button onClick={onCreate}>New</Button>
                    ) : null }
                    <Link to="/admin/projection" className="ui button right aligned">
                        Cancel
                    </Link>
                </Form>

            </div>
        );
    }
}

export default List;
