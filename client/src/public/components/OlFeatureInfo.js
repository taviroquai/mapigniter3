import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import sanitizeHtml from 'sanitize-html';

class OlFeatureInfo extends Component {

    renderTemplate(feat) {
        const template = feat.layer.getProperties().template
        const props = Object.keys(feat.getProperties())
        var html = template
        props.map(prop => {
            let exp = new RegExp("{"+prop+"}", "gi")
            html = html.replace(exp, feat.get(prop))
            return html
        })
        return sanitizeHtml(html)
    }

    renderGeneric(feat, i) {
        const props = Object.keys(feat.getProperties())
        return (
            <Table definition size="small" basic compact key={i}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Property</Table.HeaderCell>
                        <Table.HeaderCell>Value</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    { props.map(prop => prop === 'geometry' ? null : (
                        <Table.Row key={prop}>
                            <Table.Cell>{ prop }</Table.Cell>
                            <Table.Cell>
                                { feat.get(prop) instanceof Object ?
                                    feat.get(prop).toString()
                                    : feat.get(prop)
                                }
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }

    render() {
        var features = this.props.features
        if (!features) return null
        if (!(features instanceof Array)) features = [features]
        if (!features.length) return null
        return (
            <div id="FeatureInfo">
                <h4>Feature Info</h4>
                { features.map((feat, i) => feat.layer.getProperties().template ? (
                        <div key={i} dangerouslySetInnerHTML={{__html: this.renderTemplate(feat)}}></div>
                    ) : (
                        this.renderGeneric(feat, i)
                    )
                )}
            </div>
        );
    }
}

export default OlFeatureInfo;
