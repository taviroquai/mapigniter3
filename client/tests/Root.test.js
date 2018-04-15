import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../src/Root';
import Store from 'react-observable-store';
import '../src/i18nTest';
import state from '../src/config_test.json';

it('renders without crashing', () => {
  Store.init(state, true);
  const div = document.createElement('div');
  ReactDOM.render(<Root />, div);
});
