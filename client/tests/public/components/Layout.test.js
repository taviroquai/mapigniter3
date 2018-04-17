import React from 'react';
//import ReactDOM from 'react-dom';
import Layout from '../../../src/public/components/Layout';
import Store from 'react-observable-store';
import '../../../src/i18nTest';
import state from '../../../src/config_test.json';
import { HashRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetch from 'isomorphic-fetch';
global.fetch = fetch;

configure({ adapter: new Adapter() });

it('renders admin layout without crashing', async (done) => {
  Store.init(state, true);

  const wrapper = mount(
      <Router>
          <Layout user={{email: 'test@gmail.com'}} />
      </Router>
  );
  done();
  wrapper.unmount();
});
