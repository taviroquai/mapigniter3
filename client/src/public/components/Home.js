import React, { Component } from 'react';
import sanitizeHtml from 'sanitize-html';
import Store, { withStore } from 'react-observable-store';
import { Segment, Grid, Card, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Actions from '../actions.js';

class PublicHome extends Component {

    componentDidMount() {
        Actions.reload();
    }

    render() {
        const serverUrl = Store.get('server.endpoint')+'/storage/map'
        return (
            <div className="ui main container">
                <h1 className="ui header">Brand Name</h1>

                { !this.props.maps.length ? (
                    <Segment padded='very'>
                        There are no maps publish yet :)
                    </Segment>
                ) : (
                    <Grid>
                        { this.props.maps.map((map, i) => (
                            <Grid.Column mobile={16} tablet={8} computer={4}
                                key={i}
                                textAlign="center">
                                <Card key={i} centered>
                                    <Link to={'map/'+map.id}>
                                        <Image src={serverUrl+'/'+map.id+'/'+map.image} />
                                    </Link>
                                    <Card.Content>
                                        <Card.Header>
                                            {map.title}
                                        </Card.Header>
                                        <Card.Meta>
                                            <span className='date'>
                                                {map.created_at}
                                            </span>
                                        </Card.Meta>
                                        <Card.Description>
                                            <div dangerouslySetInnerHTML={{__html: sanitizeHtml(map.description)}}></div>
                                        </Card.Description>
                                    </Card.Content>
                                </Card>
                            </Grid.Column>
                        ))}
                    </Grid>
                )}
            </div>
        );
    }
}

export default withStore('home', PublicHome);
