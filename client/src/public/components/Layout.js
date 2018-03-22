import React, { Component } from 'react';
import Footer from './Footer';

import '../assets/css/index.css';

class Public extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default Public;
