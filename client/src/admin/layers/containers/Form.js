import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
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
        Store.set('layer.form.'+name, value);
        if (name === 'title' && !this.props.seo_slug) {
            Store.set('layer.form.seo_slug', this.createSeoSlug(value));
        }
    }

    onDropdownChange(e, item) {
        Store.set('layer.form.'+item.name, item.value);
    }

    onSelectImage(e, {name, value, type}) {
        Store.set('layer.form.'+name, value.name);
        Actions.setUploadImage({ image: value });
    }

    onSelectFile(e, {name, value, type}) {
        console.log('select file', type)
        Store.set('layer.form.'+name, value.name);
        Actions.setUploadFile({ file: value, field: name });
    }

    onSubmit(e) {
        e.preventDefault();
        Actions.submit();
    }

    onCreate(e) {
        e.preventDefault();
        Actions.editItem();
    }

    onPostgisConnect(e) {
        e.preventDefault();
        Actions.postgisConnect();
    }

    onGetWMSCapabilities(e) {
        e.preventDefault();
        Actions.getWMSCapabilities();
    }

    onGetWFSCapabilities(e) {
        e.preventDefault();
        Actions.getWFSCapabilities();
    }

    render() {
        if (this.props.loading) return <Wait />
        const serverUrl = Store.get('server.endpoint')+'/storage/layer'
        return (
            <FormComponent {...this.props}
                serverUrl={serverUrl}
                onInputChange={this.onInputChange.bind(this)}
                onDropdownChange={this.onDropdownChange.bind(this)}
                onSelectImage={this.onSelectImage.bind(this)}
                onSelectFile={this.onSelectFile.bind(this)}
                onSubmit={this.onSubmit.bind(this)}
                onCreate={this.onCreate.bind(this)}
                onPostgisConnect={this.onPostgisConnect.bind(this)}
                onGetWMSCapabilities={this.onGetWMSCapabilities.bind(this)}
                onGetWFSCapabilities={this.onGetWFSCapabilities.bind(this)}
            />
        );
    }
}

export default withStore('layer', Form);
