import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Wait from './Wait';
import Actions from '../../auth.js';

class Logout extends Component {

    async componentDidMount() {
        const { cookies, history } = this.props
        cookies.remove('jwt_token');
        cookies.remove('jwt_rtoken');
        cookies.remove('mapigniter3');
        await Actions.logout();
        history.push('/');
    }

    render() {
        return <Wait />
    }
}

export default withRouter(withCookies(Logout));
