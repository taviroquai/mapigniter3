import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import { withRouter } from 'react-router-dom';
import FormComponent from '../components/Form';
import Wait from '../../components/Wait';
import Actions from '../actions.js';

class Form extends Component {

    componentWillMount() {
        const id = this.props.match && this.props.match.params.id ?
            this.props.match.params.id : false
        Actions.editItem(id)
    }

    createSeoSlug(input) {
        return input.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'')
    }

    onInputChange(e, { name, value }) {
        Store.set('map.form.'+name, value);
        if (name === 'title' && !this.props.seo_slug) {
            Store.set('map.form.seo_slug', this.createSeoSlug(value));
        }
    }

    onDropdownChange(e, item) {
        Store.set('map.form.'+item.name, item.value);
    }

    onSelectFile(e, {name, value, type}) {
        Store.set('map.form.'+name, value ? value.name : '');
        Actions.files.image = value;
    }

    async onSubmit(e) {
        e.preventDefault();
        const result = await Actions.submit();
        if (result) this.props.history.push('/admin/map');
    }

    onCreate(e) {
        e.preventDefault();
        Actions.editItem();
    }

    removeLayer(e, item) {
        e.preventDefault();
        Actions.removeLayer(item);
    }

    render() {
        if (this.props.loading) return <Wait />
        const serverUrl = Store.get('server.endpoint')+'/storage/map'
        return (
            <FormComponent {...this.props}
                serverUrl={serverUrl}
                onInputChange={this.onInputChange.bind(this)}
                onDropdownChange={this.onDropdownChange.bind(this)}
                onSelectFile={this.onSelectFile.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onCreate={this.onCreate.bind(this)}
                onRemove={this.removeLayer.bind(this)}
            />
        );
    }
}

export default withRouter(withStore('map', Form));
