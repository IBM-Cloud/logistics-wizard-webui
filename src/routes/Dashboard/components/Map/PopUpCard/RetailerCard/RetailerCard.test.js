import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import RetailerCard from './RetailerCard';

const setup = () => {
  const spies = {
  };
  const props = {
    retailer: {
      id: 1261,
      managerId: null,
      address: {
        state: 'North Carolina',
        city: 'Raleigh',
        country: 'US',
        latitude: 35.71,
        longitude: -78.63,
      },
    },
  };
  const component = shallow(<RetailerCard {...props.retailer} />);

  return { spies, props, component };
};

test.todo('write tests for RetailerCard once complete.');
test('(Component) Renders with expected elements', t => {
  const { component } = setup();

  t.true(component.is('div'),
    'is wrapped by a div');
});
