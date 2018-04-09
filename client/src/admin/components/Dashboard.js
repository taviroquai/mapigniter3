import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { withStore } from 'react-observable-store';
import Actions from '../actions.js';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { Grid } from 'semantic-ui-react';

class Home extends Component {

    async componentDidMount() {
        await Actions.DashboardLoad();
    }

    render() {
        var { data1 } = this.props;
        data1 = data1.map(i => { i.value = parseInt(i.value, 10); return i;})
        return (
            <I18n ns="translations">
                { (t, { i18n }) => (
                    <div className="ui main container">
                        <h1 className="ui header">{t('Dashboard')}</h1>

                        <Grid>
                            <Grid.Row stretched>
                                <Grid.Column mobile={16} table={16} computer={16}>
                                    <h4>{t('Visits')}</h4>

                                    <ResponsiveContainer width='100%' height={260}>
                                        <LineChart data={data1}>
                                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                            <CartesianGrid stroke="#ccc" />
                                            <XAxis dataKey="name" tick={{fontSize: '12px' }}/>
                                            <YAxis />
                                            <Tooltip />
                                        </LineChart>
                                    </ResponsiveContainer>

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </div>
                )}
            </I18n>
        );
    }
}

export default withStore('dashboard', Home);
