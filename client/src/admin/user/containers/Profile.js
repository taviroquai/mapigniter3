import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import ProfileComponent from '../components/Profile';
import Wait from '../../components/Wait';
import Actions from '../actions.js';

class Profile extends Component {

    componentWillMount() {
        Actions.ProfileGetUser();
    }

    handleFormInput(e, { name, value }) {
        Actions.ProfileFormField(name, value);
    }

    handleFormRole(e, option) {
        Actions.ProfileFormField('role', option.value);
    }

    handleFormActive(e) {
        Actions.ProfileFormField('active', this.props.user.active ? 0 : 1);
    }

    submit(e) {
        e.preventDefault();
        Actions.ProfileSubmit();
    }

    render() {
        if (this.props.loading) return <Wait />
        return (
            <ProfileComponent {...this.props}
                handleFormInput={this.handleFormInput.bind(this)}
                handleFormRole={this.handleFormRole.bind(this)}
                handleFormActive={this.handleFormActive.bind(this)}
                submit={this.submit.bind(this)}
            />
        );
    }
}

export default withStore('profile', Profile);
