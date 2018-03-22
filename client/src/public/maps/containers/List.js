import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import ListComponent from '../components/List';
import Wait from '../../components/Wait';
import Actions from '../actions.js';
import helpers from '../../../helpers.js';

class List extends Component {

    componentDidMount() {
        Actions.reload();
    }

    handleSort(column) {
        Actions.setSort(column);
    }

    editItem(item) {
        Actions.editItem(item);
    }

    removeItem(item) {
        Actions.removeItem(item);
    }

    setFilter(e, input) {
        Store.set('map.filter', input.value);
    }

    applyFilter(items, filter) {
        if (!filter) return items
        const patr = new RegExp(filter, "i")
        items = items.filter(item => patr.test(item.title));
        return items;
    }

    render() {
        if (this.props.loading) return <Wait />
        var items = this.props.items || []
        items = this.applyFilter(items, this.props.filter);
        items = helpers.applySort(items, this.props.sortc, this.props.sortd);
        return (
            <ListComponent
                items={items}
                sortc={this.props.sortc}
                sortd={this.props.sortd}
                onOpen={this.editItem.bind(this)}
                onSearch={this.setFilter.bind(this)}
                onRemove={this.removeItem.bind(this)}
                onSort={this.handleSort.bind(this)}
            />
        );
    }
}

export default withStore('map', List);
