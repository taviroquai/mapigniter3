import React, { Component } from 'react';
import { withStore } from 'react-observable-store';
import { withRouter } from 'react-router-dom';
import ResetPasswordPage from '../components/ResetPasswordPage';
import { ResetInput, ResetToken, ResetSubmit } from '../actions.js';

class Recover extends Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleInput(e, { name, value }) {
        ResetInput(name, value);
    }

    handleToken(value) {
        ResetToken(value);
    }

    submit(e) {
        e.preventDefault();
        ResetSubmit(() => {
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <ResetPasswordPage {...this.props}
                handleInput={this.handleInput}
                handleToken={this.handleToken}
                submit={this.submit}
            />
        );
    }
}

export default withStore('reset', withRouter(Recover));
