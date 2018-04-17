import React from 'react';
//import ReactDOM from 'react-dom';
import OlFeatureInfo from '../../../src/public/components/OlFeatureInfo';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Store from 'react-observable-store';
import state from '../../../src/config_test.json';

configure({ adapter: new Adapter() });

it('renders feature info without crashing', () => {
  Store.init(state, true);
  const wrapper = mount(
      <OlFeatureInfo features={[]} />
  );
  wrapper.unmount();
});
