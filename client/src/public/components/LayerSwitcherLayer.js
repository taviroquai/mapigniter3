import React, { Component } from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import sanitizeHtml from 'sanitize-html';

class LayerSwitcherLayer extends Component {

    getLegendUrl(item) {
        if(!item.wms_url) return '';
        var url = item.wms_url;
        url = url + url.indexOf('?') === -1 ? '?' : '';
        return url + '&' + ([
            'SERVICE=WMS',
            'VERSION=1.1.1',
            'REQUEST=GetLegendGraphic',
            'FORMAT=image%2Fpng',
            'SRS=EPSG:' + item.projection.srid,
            'CRS=EPSG:' + item.projection.srid,
            'LAYER=' + item.wms_layers.join(',')
        ].join('&'));
    };

    render() {
        const layer = this.props
        return (
            <li key={layer.id}>
                <table>
                    <tbody>
                        <tr>
                            <td className="activate">
                                <Checkbox toggle
                                    checked={this.props.active.indexOf(layer.id) > -1}
                                    onClick={e =>this.props.onClick(e, layer)}
                                />
                            </td>
                            <td>{layer.layer.title}</td>
                            <td className="buttons">
                                { this.props.getLayersWithExtent().indexOf(layer.layer.type) > -1 ? (
                                    <Button basic icon size='mini' onClick={e => this.props.onClickZoom(e, layer)}>
                                        <Icon fitted name="maximize" />
                                    </Button>
                                ) : null }{' '}
                                { layer.layer.description ? (
                                    <Button basic icon size='mini' onClick={e => this.props.onClickExpand(e, layer)}>
                                        <Icon fitted name={this.props.expanded[layer.id] ?
                                            'caret up' :
                                            'caret down'}
                                        />
                                    </Button>
                                ) : null }
                            </td>
                        </tr>
                        { this.props.expanded[layer.id] ? (
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    <div dangerouslySetInnerHTML={{__html: sanitizeHtml(layer.layer.description)}}></div>
                                    { layer.layer.type === 'WMS' ? (
                                        <img src={this.getLegendUrl(layer)} alt={layer.layer.title} />
                                    ) : null }
                                </td>
                            </tr>
                        ) : null }
                    </tbody>
                </table>
            </li>
        );
    }
}

export default LayerSwitcherLayer;
