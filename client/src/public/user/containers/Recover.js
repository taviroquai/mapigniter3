import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import { withRouter } from 'react-router-dom';
import RecoverComponent from '../components/RecoverPage';
import Actions from '../actions.js';

class Recover extends Component {

    handleChange(e, { name, value }) {
        Actions.RecoverInput(name, value);
    }

    submit(e) {
        e.preventDefault();
        Actions.RecoverSubmit(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <RecoverComponent {...this.props}
                handleChange={this.handleChange.bind(this)}
                submit={this.submit.bind(this)}
            />
        );
    }
}

export default withStore('recover', withRouter(Recover));
