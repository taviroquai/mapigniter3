import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopMenu from './TopMenu';
import Profile from '../user/containers/Profile';
import Logout from './Logout';
import Dashboard from './Dashboard';
import LayerTypes from '../layertypes/containers/List';
import LayerTypesForm from '../layertypes/containers/Form';
import Projections from '../projections/containers/List';
import ProjectionsForm from '../projections/containers/Form';
import Layers from '../layers/containers/List';
import LayersForm from '../layers/containers/Form';
import Maps from '../maps/containers/List';
import MapsForm from '../maps/containers/Form';
import MapLayerForm from '../maplayers/containers/Form';
import Footer from './Footer';
import '../assets/css/index.css';

class Layout extends Component {
    render() {
        const { user } = this.props
        return (
            <div>
                <TopMenu user={user} />

                <Route path="/me" component={Profile} />
                <Route path="/logout" component={Logout} />
                <Route exact path="/" component={Dashboard} />
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

                <Footer />
            </div>
        );
    }
}

export default Layout;
