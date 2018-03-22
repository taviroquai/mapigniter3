import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import FormComponent from '../components/Form';
import Wait from '../../components/Wait';
import Actions from '../actions.js';

class Form extends Component {

    componentDidMount() {
        const id = this.props.match && this.props.match.params.id ?
            this.props.match.params.id : false
        Actions.editItem(id)
    }

    onInputChange(e, { name, value }) {
        Store.set('projection.form.'+name, value);
    }

    onSubmit(e) {
        e.preventDefault();
        Actions.submit();
    }

    onCreate(e) {
        e.preventDefault();
        Actions.editItem();
    }

    render() {
        if (this.props.loading) return <Wait />
        return (
            <FormComponent {...this.props}
                onInputChange={this.onInputChange.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onCreate={this.onCreate.bind(this)}
            />
        );
    }
}

export default withStore('projection', Form);
