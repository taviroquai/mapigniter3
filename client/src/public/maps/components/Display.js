import React, { Component } from 'react';
import PublicMap from '../../components/PublicMap';
import LayerSwitcher from '../../components/LayerSwitcher';
import OlFeatureInfo from '../../components/OlFeatureInfo';
import { Grid } from 'semantic-ui-react';
import '../../../assets/css/public-map.css';

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItems: [],
            zoomToLayer: null,
            featureInfo: null
        }
        this.props.current.layers.map(item => {
            if (this.state.activeItems.indexOf(item.id)) {
                this.state.activeItems.push(item.id)
            }
            return item
        })
    }

    setActive(item) {
        var state = this.state
        const index = state.activeItems.indexOf(item.id)
        if (index === -1) state.activeItems.push(item.id)
        else state.activeItems.splice(index, 1)
        this.setState(state)
    }

    setZoomToLayer(layer) {
        this.setState({
            ...this.state,
            zoomToLayer: layer
        })
    }

    onZoomDone() {
        this.setState({
            ...this.state,
            zoomToLayer: null
        })
    }

    onMapClick(coordinate, features) {
        this.setState({
            ...this.state,
            featureInfo: features
        })
    }

    render() {
        var { current } = this.props
        return (
            <div className="public-map">
                <h1 className="ui header">{ current.title }</h1>

                <Grid>
                    <Grid.Column mobile={16} tablet={8} computer={4}>
                        <LayerSwitcher map={current}
                            activeItems={this.state.activeItems}
                            onClick={(e, item) => this.setActive(item)}
                            onClickZoom={(e, item) => this.setZoomToLayer(item)}
                        />
                        <OlFeatureInfo features={this.state.featureInfo} />
                    </Grid.Column>
                    <Grid.Column mobile={16} tablet={8} computer={12}>
                        <PublicMap {...current }
                            activeItems={this.state.activeItems}
                            zoomToLayer={this.state.zoomToLayer}
                            onZoomDone={this.onZoomDone.bind(this)}
                            height="540px"
                            onSingleClick={(coords, feat) => this.onMapClick(coords, feat)}
                        />
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Display;
