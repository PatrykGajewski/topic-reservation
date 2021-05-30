import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const wrapper = shallow(<App />);
it('should render <App />', () => {
  expect(wrapper);
});

it('<App /> should contains children', () => {
  expect(wrapper.children().length === 1);
})
