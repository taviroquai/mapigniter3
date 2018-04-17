import React from 'react';
//import ReactDOM from 'react-dom';
import Wait from '../../../src/public/components/Wait';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders public footer without crashing', () => {
  const wrapper = mount(
      <Wait />
  );
  wrapper.unmount();
});
