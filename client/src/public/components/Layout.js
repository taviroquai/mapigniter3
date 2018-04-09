import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TopMenu from './TopMenu';
import Home from './Home';
import Login from '../user/containers/Login';
import Recover from '../user/containers/Recover';
import ResetPassword from '../user/containers/ResetPassword';
import MapDisplay from '../maps/containers/Display';
import Footer from './Footer';

import '../assets/css/index.css';

class Public extends Component {
    render() {
        return (
            <div>
                <TopMenu />

                <Route exact path="/" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/map/:id" component={MapDisplay} />
                <Route path="/login" component={Login} />
                <Route exact path="/recover" component={Recover} />
                <Route path="/reset/:token" component={ResetPassword} />

                <Footer />
            </div>
        );
    }
}

export default Public;
