import React, { Component } from 'react';
import Store, { withStore } from 'react-observable-store';
import ListComponent from '../components/List';
import Wait from '../../components/Wait';
import Actions from '../actions.js';
import helpers from '../../../helpers.js';

class List extends Component {

    async componentDidMount() {
        await Actions.reload();
    }

    handleSort(column) {
        Actions.setSort(column);
    }

    async removeItem(item) {
        await Actions.removeItem(item);
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
        const { loading, filter, sortc, sortd } = this.props
        if (loading) return <Wait />
        var items = this.props.items || []
        items = this.applyFilter(items, filter);
        items = helpers.applySort(items, sortc, sortd);
        return (
            <ListComponent
                items={items}
                sortc={sortc}
                sortd={sortd}
                onSearch={this.setFilter.bind(this)}
                onRemove={this.removeItem.bind(this)}
                onSort={this.handleSort.bind(this)}
            />
        );
    }
}

export default withStore('map', List);
