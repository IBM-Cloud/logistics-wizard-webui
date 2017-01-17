import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { RetailerCard } from './RetailerCard';

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
    retrieveWeatherObservations: () => {},
  };
  const component = shallow(<RetailerCard {...props} />);

  return { spies, props, component };
};

test('(Component) Renders with expected elements', t => {
  const { component } = setup();

  t.true(component.is('div'), 'is wrapped by a div');
  t.is(component.find('Table').length, 0, 'has no shipment table');
});

const propsWithShipments = {
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
  shipments: [
    {
      id: '0',
      status: 'NEW',
    },
  ],
  retrieveWeatherObservations: () => {},
};
test('(Component) Renders with expected elements', t => {
  const component = shallow(<RetailerCard {...propsWithShipments} />);
  t.true(component.is('div'), 'is wrapped by a div');
  t.is(component.find('Table').length, 1, 'has shipment table');
});
