import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class Wait extends Component {
    render() {
        return (
            <div className="ui main text container" style={{height: '440px'}}>
                <h1 className="ui header">TodoMVC</h1>

                <Dimmer active inverted>
                    <Loader />
                </Dimmer>

            </div>
        );
    }
}

export default Wait;
