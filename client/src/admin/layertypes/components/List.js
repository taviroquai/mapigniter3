import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Button, Table, Icon, Input } from 'semantic-ui-react';


class List extends Component {

    render() {
        var { sortc, sortd, items, onSearch, onSort, onRemove } = this.props
        return (
            <div className="ui main text container">

                <Segment floated="right" basic>
                    <Input size="small" placeholder="Search..." icon="search"
                        onChange={onSearch}
                    />
                <Link to="/admin/layertype/form" className="ui button right aligned">
                        New Layer Type
                    </Link>
                </Segment>

                <h1 className="ui header">Layer Types</h1>

                <Table sortable compact celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell sorted={sortc === 'id' ? sortd : null}
                                onClick={(e) => onSort('id')}>
                                ID
                            </Table.HeaderCell>
                            <Table.HeaderCell sorted={sortc === 'label' ? sortd : null}
                                onClick={(e) => onSort('label')}>
                                Label
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
                                        <Link to={'/admin/layertype/form/'+item.id}>
                                            { item.label }
                                        </Link>
                                    ) : item.label }
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
