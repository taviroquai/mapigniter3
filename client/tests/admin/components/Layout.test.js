import React from 'react';
//import ReactDOM from 'react-dom';
import Layout from '../../../src/admin/components/Layout';
import Actions from '../../../src/admin/actions';
import Store from 'react-observable-store';
import '../../../src/i18nTest';
import state from '../../../src/config_test.json';
import { HashRouter as Router } from 'react-router-dom';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import nock from 'nock';
import fetch from 'isomorphic-fetch';
global.fetch = fetch;

configure({ adapter: new Adapter() });

it('renders admin layout without crashing', async (done) => {
  Store.init(state, true);

  nock(state.server.endpoint)
    .replyContentLength()
	.post('/api/admin')
	.reply(200, {data:{getStats:{stats1:[{name:"Apr 17",value:"0",month:"APR",year:"2017",__typename:"Stats1"}],__typename:"Stats1"}}});

  const wrapper = mount(
      <Router>
          <Layout user={{email: 'test@gmail.com'}} />
      </Router>
  );
  done();
  wrapper.unmount();
});

it('calls admin action load dashboard', async (done) => {
  Store.init(state, true);

  nock(state.server.endpoint)
    .replyContentLength()
	.post('/api/admin')
	.reply(200, {data:{getStats:{stats1:[{name:"Apr 17",value:"0",month:"APR",year:"2017",__typename:"Stats1"}],__typename:"Stats1"}}});
  await Actions.DashboardLoad()
  done();
});

it('calls admin action with error', async (done) => {
  Store.init(state, true);

  nock(state.server.endpoint)
    .replyContentLength()
	.post('/api/admin')
	.replyWithError('something awful happened');
  await Actions.DashboardLoad()
  done();
});
