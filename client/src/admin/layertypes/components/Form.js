import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message, Button } from 'semantic-ui-react';

class List extends Component {

    render() {
        var { form, error, onSubmit, onInputChange, onCreate } = this.props
        return (
            <div className="ui main text container">
                <h1 className="ui header">Layer Type</h1>

                <Form error={!!error} onSubmit={onSubmit}>
                    <Form.Field required>
                        <label>Label</label>
                        <Form.Input name="label" placeholder='Label'
                            value={form.label || ''}
                            onChange={onInputChange}
                        />
                    </Form.Field>
                    <Form.Field required>
                        <label>Key (system wide)</label>
                        <Form.Input name="key" placeholder='Key'
                            disabled={!!form.id}
                            value={form.key || ''}
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
                    <Link to="/admin/layertype" className="ui button right aligned">
                        Cancel
                    </Link>
                </Form>

            </div>
        );
    }
}

export default List;
