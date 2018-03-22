import React, { Component } from 'react';
import imgLogo from '../assets/images/logo.png';

class Footer extends Component {
    render() {
        return (
            <div className="ui inverted vertical footer segment">
                <div className="ui center aligned container">
                    <img alt="Logo" src={imgLogo} className="ui centered mini image" />
                    <div className="ui horizontal inverted small divided link list">
                        <a className="item" role="button">&copy; 2018 MapIgniter3</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
