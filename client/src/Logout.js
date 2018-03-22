import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Wait from './public/components/Wait';
import Actions from './auth.js';

class Logout extends Component {

    componentDidMount() {
        const { cookies, history } = this.props
        setTimeout(function(){
             Actions.logout(cookies, history);
        }, 500);
    }

    render() {
        return <Wait />
    }
}

export default withRouter(withCookies(Logout));
