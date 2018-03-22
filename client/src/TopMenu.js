import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import AdminTopMenu from './admin/components/TopMenu';
import PublicTopMenu from './public/components/TopMenu';

class TopMenu extends Component {
    render() {
        return this.props.cookies.get('auth_token') ? (
            <AdminTopMenu {...this.props} />
        ) : (
            <PublicTopMenu {...this.props} />
        )
    }
}

export default withCookies(TopMenu);
