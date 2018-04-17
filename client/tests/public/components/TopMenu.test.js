import React from 'react';
//import ReactDOM from 'react-dom';
import TopMenu from '../../../src/public/components/TopMenu';
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
          <TopMenu user={{email: 'test@gmail.com'}} />
      </Router>
  );
  done();
  wrapper.unmount();
});
