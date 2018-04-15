import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Menu, Button, Flag } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withStore } from 'react-observable-store';
import imgLogo from '../assets/images/logo.png';

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

                        <Menu.Item name='Dashboard' as={Link} to="/admin">
                            Dashboard
                        </Menu.Item>

                        <Menu.Item name="Layer Types" as={Link} to="/admin/map">
                            Maps
                        </Menu.Item>

                        <Menu.Item name="Layer Types" as={Link} to="/admin/layer">
                            Layers
                        </Menu.Item>

                        <Menu.Item name="Layer Types" as={Link} to="/admin/projection">
                            Projections
                        </Menu.Item>

                        <Menu.Item name="Layer Types" as={Link} to="/admin/layertype">
                            Layer Types
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
                                <Menu.Item name='User' as={Link} to="/me">
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
