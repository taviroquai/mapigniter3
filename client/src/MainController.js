import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import SplashScreen from './public/components/SplashScreen';
import AdminLayout from './admin/components/Layout';
import PublicLayout from './public/components/Layout';
import Auth from './auth'

class MainController extends Component {

    async componentDidMount() {
        await Auth.getUser();
    }

    render() {
        const { loading, user } = this.props
        if (loading) return <SplashScreen />
        if (user) return <AdminLayout user={user} />
        return <PublicLayout />
    }
}

export default withStore('profile', MainController);
