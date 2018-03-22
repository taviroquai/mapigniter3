import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import { withCookies } from 'react-cookie';
import { Redirect, withRouter } from 'react-router-dom';
import LoginComponent from '../components/Login';
import Actions from '../../../auth.js';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChange(e, { name, value }) {
        Actions.updateField(name, value);
    }

    async submit(e) {
        e.preventDefault();
        const { cookies, history } = this.props;
        Actions.login(cookies, history);
    }

    render() {
        if (this.props.cookies.get('auth_token')) {
            return <Redirect to="/me" />
        }
        return (
            <LoginComponent {...this.props}
                handleChange={this.handleChange}
                submit={this.submit}
            />
        );
    }
}

export default withStore('login', withRouter(withCookies(Login)));
