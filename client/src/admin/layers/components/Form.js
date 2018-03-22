import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Message, Button, Tab, Segment } from 'semantic-ui-react';
import FormTabBasic from './FormTabBasic'
import FormTabFeatures from './FormTabFeatures'
import FormTabVectorStyle from './FormTabVectorStyle'

class ItemForm extends Component {

    render() {
        var { error, onSubmit, onCreate } = this.props
        var tabs = []
        tabs.push({ menuItem: 'Basic Information', render: () => <Tab.Pane><FormTabBasic {...this.props} /></Tab.Pane> })

        // Add vector options tabs
        if (['WFS', 'KML', 'GPX', 'GEOJSON', 'POSTGIS'].indexOf(this.props.form.type) > -1) {
            tabs.push({ menuItem: 'Vectors Options', render: () => <Tab.Pane><FormTabFeatures {...this.props} /></Tab.Pane> })
            tabs.push({ menuItem: 'Vectors Style', render: () => <Tab.Pane><FormTabVectorStyle {...this.props} /></Tab.Pane> })
        }
        return (
            <div className="ui main container">

                <Form error={!!error} onSubmit={onSubmit}>

                    <Segment basic clearing floated="right">
                        <Button type='submit'>Save</Button>
                        { onCreate ? (
                            <Button onClick={onCreate}>New</Button>
                        ) : null }
                        <Link to="/admin/layer" className="ui button right aligned">
                            Cancel
                        </Link>
                    </Segment>

                    <h1 className="ui header">Layer</h1>

                    <Message error
                        header='Error'
                        content={error}
                    />

                    <Tab panes={tabs} />

                </Form>

            </div>
        );
    }
}

export default ItemForm;
