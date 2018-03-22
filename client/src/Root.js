import React, { Component } from 'react';
import MainController from './MainController.js';
import { HashRouter as Router } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

/**
 * Use React Router and Cookies
 */
class Root extends Component {
    render() {
        return (
            <Router>
                <CookiesProvider>
                    <MainController />
                </CookiesProvider>
            </Router>
        );
    }
}

export default Root;
