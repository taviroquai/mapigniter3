import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import Store, { withStore } from 'react-observable-store';
import DisplayComponent from '../components/Display';
import Wait from '../../components/Wait';
import Actions from '../actions.js';
import PublicActions from '../../actions.js';

class Display extends Component {

    componentWillMount() {
        const id = this.props.match && this.props.match.params.id ?
            this.props.match.params.id : false
        Actions.loadMap(id)
        PublicActions.saveRequest({
            map_id: id,
            http_method: 'GET',
            http_url: (window ? window.location.protocol + '//'
                + window.location.host : '')
                + this.props.location.pathname,
            http_path: this.props.location.pathname
        }, this.props.cookies.get('auth_token'))
    }

    render() {
        if (this.props.loading || !this.props.current) return <Wait />
        var baseURL = Store.get('server.endpoint');
        return (
            <DisplayComponent {...this.props}
                baseURL={baseURL}
            />
        );
    }
}

export default withCookies(withStore('mapdisplay', Display));
