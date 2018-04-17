import React from 'react';
//import ReactDOM from 'react-dom';
import Footer from '../../../src/public/components/Footer';
import '../../../src/i18nTest';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders public footer without crashing', () => {
  const wrapper = mount(
      <Footer />
  );
  wrapper.unmount();
});
