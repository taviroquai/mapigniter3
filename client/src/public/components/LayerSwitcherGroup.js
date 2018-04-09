import React, { Component } from 'react';
import { Checkbox, Button, Icon } from 'semantic-ui-react';
import LayerSwitcherLayer from './LayerSwitcherLayer';

class LayerSwitcherGroup extends Component {

    isDisabled() {
        return this.props.disabled || (
            this.props.parentId
                && (this.props.activeItems.indexOf(this.props.parentId) === -1)
            )
    }

    render() {
        const group = this.props.group
        return (
            <li key={group.id}>
                <table>
                    <tbody>
                        <tr>
                            <td className="activate">
                                <Checkbox toggle
                                    checked={this.props.activeItems.indexOf(group.id) > -1}
                                    disabled={this.isDisabled.call(this)}
                                    onClick={e =>this.props.onClick(e, group)}
                                />
                            </td>
                            <td>{group.layer.title}</td>
                            <td className="buttons">
                                { group.layers && group.layers.length ? (
                                    <Button basic icon size='mini' onClick={e => this.props.onClickExpand(e, group)}>
                                        <Icon fitted name={this.props.expandedItems[group.id] ?
                                            'caret up' :
                                            'caret down'}
                                        />
                                    </Button>
                                ) : null }
                            </td>
                        </tr>
                        { this.props.expandedItems[group.id] ? (
                            <tr>
                                <td></td>
                                <td colSpan="2">
                                    <div dangerouslySetInnerHTML={{__html: group.layer.description}}></div>
                                </td>
                            </tr>
                        ) : null }
                        { this.props.expandedItems[group.id] ? (
                            <tr>
                                <td colSpan="3">
                                    <ul>
                                        { group.layers.map(layer => layer.layers ?
                                            <LayerSwitcherGroup key={layer.id}
                                                group={layer}
                                                activeItems={this.props.activeItems}
                                                expandedItems={this.props.expandedItems}
                                                parentId={group.id}
                                                disabled={this.isDisabled()}
                                                onClick={this.props.onClick}
                                                onClickExpand={this.props.onClickExpand}
                                                onClickZoom={this.props.onClickZoom}
                                                getLayersWithExtent={this.props.getLayersWithExtent}
                                            /> :
                                            <LayerSwitcherLayer key={layer.id}
                                                layer={layer}
                                                activeItems={this.props.activeItems}
                                                expandedItems={this.props.expandedItems}
                                                parentId={group.id}
                                                disabled={this.isDisabled()}
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
