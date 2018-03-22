import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';

class ImageUpload extends Component {

    constructor(props) {
        super(props)
        this.state = {
            image: false
        }
    }

    setImagePreview(file) {
        var me = this, reader = new FileReader();
        reader.onload = function() {
            me.setState({image: reader.result})
        };
        reader.readAsDataURL(file);
    }

    render() {
        var { name, src, onClear, onSelectFile } = this.props
        if (src || this.state.image) {
            return (
                <label style={{ position: 'relative' }}>
                    <img className="ui fluid centered medium image"
                        src={this.state.image ? this.state.image : src}
                        alt={src} />
                    <Button icon color="red" size="mini" style={{position: 'absolute', top: '0px', right: '0px'}}
                        onClick={(e) => {
                            this.setState({image: false})
                            onClear()
                        }}>
                        <Icon name="remove" />
                    </Button>
                </label>
            )
        } else {
            return (
                <div>
                    <input name="upload"
                        id="fileImport"
                        placeholder="Escolha a imagem"
                        type="file"
                        accept="mime/png"
                        onChange={(e) => {
                            if (e.target.files.length) {
                                this.setImagePreview(e.target.files[0])
                                onSelectFile(e, {name, type: 'png', value: e.target.files[0]})
                            }
                        }}
                        style={{display: 'none'}}
                    />
                <label htmlFor="fileImport" className="ui fluid primary button">
                        <i className="ui upload icon"></i>
                        Choose Image
                    </label>
                </div>
            )
        }
    }
}

export default ImageUpload;
