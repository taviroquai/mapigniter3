import React from 'react';
//import ReactDOM from 'react-dom';
import SplashScreen from '../../../src/public/components/SplashScreen';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders public home without crashing', () => {
  const wrapper = mount(
      <SplashScreen />
  );
  wrapper.unmount();
});
