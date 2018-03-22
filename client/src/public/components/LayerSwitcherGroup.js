import React, { Component } from 'react';
import { Checkbox, Button, Icon } from 'semantic-ui-react';
import LayerSwitcherLayer from './LayerSwitcherLayer';

class LayerSwitcherGroup extends Component {

    render() {
        const group = this.props
        return (
            <li key={group.id}>
                <table>
                    <tbody>
                        <tr>
                            <td className="activate">
                                <Checkbox toggle
                                    checked={this.props.active.indexOf(group.id) > -1}
                                    onClick={e =>this.props.onClick(e, group)}
                                />
                            </td>
                            <td>{group.layer.title}</td>
                            <td className="buttons">
                                { group.layers && group.layers.length ? (
                                    <Button basic icon size='mini' onClick={e => this.props.onClickExpand(e, group)}>
                                        <Icon fitted name={this.props.expanded[group.id] ?
                                            'caret up' :
                                            'caret down'}
                                        />
                                    </Button>
                                ) : null }
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td colSpan="2">
                                <div dangerouslySetInnerHTML={{__html: group.layer.description}}></div>
                            </td>
                        </tr>
                        { this.props.expanded[group.id] ? (
                            <tr>
                                <td colSpan="3">
                                    <ul>
                                        { group.layers.map(layer => layer.layers ?
                                            <LayerSwitcherGroup key={layer.id} {...layer}
                                                active={this.props.active}
                                                expanded={this.props.expanded}
                                                onClick={this.props.onClick}
                                                onClickExpand={this.props.onClickExpand}
                                                onClickZoom={this.props.onClickZoom}
                                            /> :
                                            <LayerSwitcherLayer key={layer.id} {...layer}
                                                active={this.props.active}
                                                expanded={this.props.expanded}
                                                onClick={this.props.onClick}
                                                onClickExpand={this.props.onClickExpand}
                                                onClickZoom={this.props.onClickZoom}
                                                getLayersWithExtent={this.props.getLayersWithExtent}
                                            />
                                        )}
                                    </ul>
                                </td>
                            </tr>
                        ) : null }
                    </tbody>
                </table>
            </li>
        );
    }
}

export default LayerSwitcherGroup;
