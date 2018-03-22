import React, { Component } from 'react';
import AdminLayout from './admin/components/Layout';
import PublicLayout from './public/components/Layout';

class Layout extends Component {
    render() {
        return this.props.cookies.get('auth_token') ? (
            <AdminLayout {...this.props} />
        ) : (
            <PublicLayout {...this.props} />
        )
    }
}

export default Layout;
