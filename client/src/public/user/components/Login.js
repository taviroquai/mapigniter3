import React, { Component } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="ui main text container">
                <h1 className="ui header">Login</h1>

                <Form error={!!this.props.errors} onSubmit={this.props.submit}>
                    <Form.Field required>
                        <label>E-mail</label>
                        <Form.Input name="email" placeholder='E-mail' onChange={this.props.handleChange} />
                    </Form.Field>
                    <Form.Field required>
                        <label>Password</label>
                        <Form.Input name="pwd" type="password" placeholder='Password' onChange={this.props.handleChange}/>
                    </Form.Field>
                    <Message error
                        header='Error'
                        content='Wrong email/password or the account is not enabled.'
                    />

                    { this.props.errors && this.props.errors.password ? (
                        <div className="eight wide column">
                            <Message error
                                header='Error'
                                content='Wrong email/password or the account is not enabled.'
                            />
                        </div>
                    ) : null }

                    <Button type='submit'>Submit</Button>
                    <Link to="/recover" style={{float: 'right'}}>Forgot Password</Link>
                </Form>
            </div>
        );
    }
}

export default Login;
