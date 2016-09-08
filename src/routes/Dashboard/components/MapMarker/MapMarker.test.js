import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import MapMarker from './MapMarker';

const setup = () => {
  const spies = {
  };
  const props = {
    type: 'retailer',
  };
  const component = shallow(<MapMarker {...props} />);

  return { spies, props, component };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();

  t.true(component.is('div'),
    'is wrapped by a div.');
});
