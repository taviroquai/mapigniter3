import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Table, Button, Icon, Segment } from 'semantic-ui-react';

class MapLayersList extends Component {

    render() {
        var { map, onRemove } = this.props
        return (
            <Grid>
                <Grid.Column mobile={16} tablet={16} computer={16}>

                    <Segment floated="right" basic>
                        <Link to={'/admin/maplayer/form/' + map.id} className="ui button right aligned">
                            Add Layer
                        </Link>
                    </Segment>

                    <h4>Layers</h4>

                    <Table sortable compact celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>
                                    ID
                                </Table.HeaderCell>
                                <Table.HeaderCell>
                                    Title
                                </Table.HeaderCell>
                                <Table.HeaderCell />
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            { map.layers.map((item) => (
                                <Table.Row key={item.id}>
                                    <Table.Cell>
                                        { item.id }
                                    </Table.Cell>
                                    <Table.Cell>
                                        { item.layer.title }
                                    </Table.Cell>
                                    <Table.Cell textAlign='right'>
                                        { this.props.onRemove ? (
                                            <Button icon onClick={(e) => onRemove(e, item)}>
                                                <Icon name='remove' />
                                            </Button>
                                        ) : null }
                                    </Table.Cell>
                                </Table.Row>
                            )) }
                        </Table.Body>

                    </Table>
                </Grid.Column>
            </Grid>
        );
    }
}

export default MapLayersList;
