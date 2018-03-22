import React, { Component } from 'react';
import imgLogo from '../assets/images/logo.png';
import { I18n } from 'react-i18next';
import { Menu, Button, Flag } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withStore } from 'react-observable-store';

class TopMenu extends Component {

    render() {
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <Menu attached='top' inverted>
                        <Link to="/" className="header item">
                            <img alt="" className="logo" src={imgLogo} />
                            <span className="mobile hidden">Brand</span>
                        </Link>
                        <Menu.Item name='home' as={Link} to="/">
                            Home
                        </Menu.Item>

                        <Menu.Menu position='right'>
                            <Button inverted onClick={() => i18n.changeLanguage('en')}>
                                <Flag name='gb' />
                            </Button>
                            <Button inverted onClick={() => i18n.changeLanguage('pt')}>
                                <Flag name='pt' />
                            </Button>
                            { !this.props.user && (
                                <Menu.Item name='Login' as={Link} to="/login">
                                    Login
                                </Menu.Item>
                            ) }
                            { this.props.user && (
                                <Menu.Item name='Profile' as={Link} to="/me">
                                    { this.props.user.email }
                                </Menu.Item>
                            ) }
                            { this.props.user && (
                                <Menu.Item name='Logout' as={Link} to="/logout">
                                    Logout
                                </Menu.Item>
                            ) }
                        </Menu.Menu>
                    </Menu>
                )}
            </I18n>
        );
    }
}

export default withStore('profile', TopMenu);
