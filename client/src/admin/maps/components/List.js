import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Table, Icon, Input } from 'semantic-ui-react';


class List extends Component {

    render() {
        var { sortc, sortd, items, onSearch, onSort, onRemove } = this.props
        return (
            <div className="ui main container">

                <Segment floated="right" basic>
                    <Input size="small" placeholder="Search..." icon="search"
                        onChange={onSearch}
                    />
                    <Link to="/admin/map/form" className="ui button right aligned">
                        New Map
                    </Link>
                </Segment>

                <h1 className="ui header">Maps</h1>

                <Table sortable compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={sortc === 'id' ? sortd : null}
                                onClick={(e) => onSort('id')}>
                                ID
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={sortc === 'title' ? sortd : null}
                                onClick={(e) => onSort('title')}>
                                Title
                            </Table.HeaderCell>
                            <Table.HeaderCell />
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        { items.map((item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>
                                    { item.id }
                                </Table.Cell>
                                <Table.Cell>
                                    { this.props.onOpen ? (
                                        <Link to={'/admin/map/form/'+item.id}>
                                            { item.title }
                                        </Link>
                                    ) : item.title }
                                </Table.Cell>
                                <Table.Cell textAlign='right'>
                                    { this.props.onRemove ? (
                                        <Button icon onClick={(e) => onRemove(item)}>
                                            <Icon name='remove' />
                                        </Button>
                                    ) : null }
                                </Table.Cell>
                            </Table.Row>
                        )) }
                    </Table.Body>

                </Table>
            </div>
        );
    }
}

export default List;
