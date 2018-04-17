import React from 'react';
//import ReactDOM from 'react-dom';
import Home from '../../../src/public/components/Home';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Store from 'react-observable-store';
import state from '../../../src/config_test.json';

configure({ adapter: new Adapter() });

it('renders public home without crashing', () => {
  Store.init(state, true);
  const wrapper = mount(
      <Home />
  );
  wrapper.unmount();
});
