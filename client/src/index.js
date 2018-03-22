import React from 'react';
import ReactDOM from 'react-dom';
import Store from 'react-observable-store';
import './semantic/dist/semantic.min.css';
import Root from './Root';
import './i18n';
import registerServiceWorker from './registerServiceWorker';
import state from './config.json';

// Initial state
state['login'] = {}
state['recover'] = {}
state['reset'] = {token: ''}
state['profile'] = {user: false}
state['home'] = {maps: []}
state['dashboard'] ={data1: [], loading: true}
state['layertype'] = {form: {}, sortc: "id", sortd: "ascending"}
state['projection'] = {form: {}, sortc: "id", sortd: "ascending"}
state['layer'] = {form: {}, sortc: "id", sortd: "ascending"}
state['map'] = {form: {layers: []}, sortc: "id", sortd: "ascending"}
state['maplayer'] = {form: {layers: []}, sortc: "id", sortd: "ascending"}
state['mapdisplay'] = {current: null}
Store.init(state, true);

// Start app
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
