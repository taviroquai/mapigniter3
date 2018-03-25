import React, { Component } from 'react';
import LayerSwitcherGroup from './LayerSwitcherGroup';
import LayerSwitcherLayer from './LayerSwitcherLayer'
import '../../assets/css/layerswitcher.css';

class LayerSwitcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expandedItems: {}
        }
    }

    onClickExpand(e, item) {
        var state = this.state
        state.expandedItems[item.id] = !state.expandedItems[item.id]
        this.setState({state})
    }

    getLayersWithExtent() {
        return ['KML', 'GPX', 'GEOJSON', 'POSTGIS', 'GEOPACKAGE']
    }

    render() {
        var layers = []
        this.props.map.layers.map((item, i) => {
            if (item.layer.type === 'GROUP') {
                item.layers = this.props.map.layers.filter(sub => sub.parent_id === item.layer.id)
            }
            layers.push(item)
            return item
        })
        layers = layers.filter(item => !item.parent_id)
        return (
            <div id="layer-switcher">
                <ul>
                    { layers.map(item => item.layers ?
                        <LayerSwitcherGroup
                            key={item.id}
                            group={item}
                            activeItems={this.props.activeItems}
                            expandedItems={this.state.expandedItems}
                            onClick={this.props.onClick}
                            onClickExpand={this.onClickExpand.bind(this)}
                            onClickZoom={this.props.onClickZoom}
                            getLayersWithExtent={this.getLayersWithExtent}
                        /> :
                        <LayerSwitcherLayer key={item.id}
                            layer={item}
                            activeItems={this.props.activeItems}
                            expandedItems={this.state.expandedItems}
                            onClick={this.props.onClick}
                            onClickExpand={this.onClickExpand.bind(this)}
                            onClickZoom={this.props.onClickZoom}
                            getLayersWithExtent={this.getLayersWithExtent}
                        />
                    )}
                </ul>
            </div>
        );
    }
}

export default LayerSwitcher;
