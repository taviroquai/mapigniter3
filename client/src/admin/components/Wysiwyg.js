import React, { Component } from 'react';
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'font-awesome/css/font-awesome.css';
import $ from 'jquery';
window.$ = $;

class Wysiwyg extends Component {

    constructor(props) {
        super(props);

        // Init model
        this.state = {
            model: this.props.content
        };
        this.config = {
            height: 220,
            reactIgnoreAttrs: ['class', 'id']
        };
    }

    handleModelChange(model) {
        this.setState({
            model: model
        });
        this.props.onChange(model);
    }

    render() {
        return <FroalaEditor tag='textarea'
            config={this.config}
            model={this.state.model}
            onModelChange={this.handleModelChange.bind(this)}
        />
    }
}

export default Wysiwyg
