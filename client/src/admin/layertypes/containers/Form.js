import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import { withRouter } from 'react-router-dom';
import FormComponent from '../components/Form';
import Wait from '../../components/Wait';
import Actions from '../actions.js';

class Form extends Component {

    componentDidMount() {
        const id = this.props.match && this.props.match.params.id ?
            this.props.match.params.id : false
        id ? Actions.editItem(id) : Actions.editNewItem()
    }

    onInputChange(e, { name, value }) {
        Store.set('layertype.form.'+name, value);
    }

    async onSubmit(e) {
        e.preventDefault();
        const result = await Actions.submit();
        if (result) this.props.history.push('/admin/layertype')
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

export default withRouter(withStore('layertype', Form));
