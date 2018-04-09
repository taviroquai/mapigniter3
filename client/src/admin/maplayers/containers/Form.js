import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import FormComponent from '../components/Form';
import Wait from '../../components/Wait';
import Actions from '../actions.js';

class Form extends Component {

    componentWillMount() {
        const { map_id } = this.props.match.params
        Actions.editNewItem(map_id)
    }

    onInputChange(e, { name, value }) {
        Store.set('maplayer.form.'+name, value);
    }

    onDropdownChange(e, item) {
        Store.set('maplayer.form.'+item.name, item.value);
    }

    onCheckboxChange(e, { name, checked }) {
        Store.set('maplayer.form.'+name, checked);
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
                onDropdownChange={this.onDropdownChange.bind(this)}
                onCheckboxChange={this.onCheckboxChange.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onCreate={this.onCreate.bind(this)}
            />
        );
    }
}

export default withStore('maplayer', Form);
