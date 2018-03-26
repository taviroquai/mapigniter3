import React from 'react';
import ReactDOM from 'react-dom';
import Store from 'react-observable-store';
import './semantic/dist/semantic.min.css';
import Root from './Root';
import './i18n';
import registerServiceWorker from './registerServiceWorker';
import state from './config.json';

// Initial state
Store.init(state, true);

// Start app
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
