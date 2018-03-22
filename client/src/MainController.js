import React, { Component } from 'react';
import { withCookies } from 'react-cookie';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import TopMenu from './TopMenu';
import Home from './public/components/Home';
import Login from './public/user/containers/Login';
import Profile from './public/user/containers/Profile';
import Recover from './public/user/containers/Recover';
import ResetPassword from './public/user/containers/ResetPassword';
import MapDisplay from './public/maps/containers/Display';
import Logout from './Logout';
import Dashboard from './admin/components/Dashboard';
import LayerTypes from './admin/layertypes/containers/List';
import LayerTypesForm from './admin/layertypes/containers/Form';
import Projections from './admin/projections/containers/List';
import ProjectionsForm from './admin/projections/containers/Form';
import Layers from './admin/layers/containers/List';
import LayersForm from './admin/layers/containers/Form';
import Maps from './admin/maps/containers/List';
import MapsForm from './admin/maps/containers/Form';
import MapLayerForm from './admin/maplayers/containers/Form';
import Actions from './auth'
import LayerTypesActions from './admin/layertypes/actions.js';

class MainController extends Component {
    async componentDidMount() {
        await LayerTypesActions.reload()
        if (this.props.cookies.get('auth_token')) {
            await Actions.getUser(this.props.cookies.get('auth_token'));
        }
    }
    render() {
        return (
            <Layout {...this.props}>
                <TopMenu />

                <Route exact path="/admin" component={Dashboard} />
                <Route exact path="/admin/layertype" component={LayerTypes} />
                <Route path="/admin/layertype/form/:id?" component={LayerTypesForm} />
                <Route exact path="/admin/projection" component={Projections} />
                <Route path="/admin/projection/form/:id?" component={ProjectionsForm} />
                <Route exact path="/admin/layer" component={Layers} />
                <Route path="/admin/layer/form/:id?" component={LayersForm} />
                <Route exact path="/admin/map" component={Maps} />
                <Route path="/admin/map/form/:id?" component={MapsForm} />
                <Route path="/admin/maplayer/form/:map_id?/:id?" component={MapLayerForm} />

                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/map/:id" component={MapDisplay} />
                <Route path="/login" component={Login} />
                <Route path="/me" component={Profile} />
                <Route path="/logout" component={Logout} />
                <Route exact path="/recover" component={Recover} />
                <Route path="/reset/:token" component={ResetPassword} />
            </Layout>
        )
    }
}

export default withCookies(MainController);
