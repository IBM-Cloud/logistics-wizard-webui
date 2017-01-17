import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { ShipmentCard } from './ShipmentCard';

test('(Component) ShipmentCard shows a progress when no weather data.', t => {
  const props = {
    shipment: {
      toId: 462,
      estimatedTimeOfArrival: '2016-10-22T00:00:00.000Z',
      status: 'DELIVERED',
      updatedAt: '2016-10-20T12:15:37.000Z',
      currentLocation: {
        state: 'Texas',
        latitude: 32.74,
        country: 'US',
        longitude: -96.8,
        city: 'Dallas',
      },
      fromId: 2,
      deliveredAt: null,
      createdAt: '2016-09-08T16:26:16.933Z',
      id: 810,
    },
    retrieveWeatherObservations: () => {},
  };
  const component = shallow(<ShipmentCard {...props} />);
  t.is(component.find('LoadingSpinner').length, 1, 'has a loading spinner');
});

test('(Component) ShipmentCard shows current weather when it exists.', t => {
  const props = {
    shipment: {
      toId: 462,
      estimatedTimeOfArrival: '2016-10-22T00:00:00.000Z',
      status: 'DELIVERED',
      updatedAt: '2016-10-20T12:15:37.000Z',
      currentLocation: {
        state: 'Texas',
        latitude: 32.74,
        country: 'US',
        longitude: -96.8,
        city: 'Dallas',
        weather: {
          observation: {
            wx_phrase: 'Good weather',
          },
        },
      },
      fromId: 2,
      deliveredAt: null,
      createdAt: '2016-09-08T16:26:16.933Z',
      id: 810,
    },
    retrieveWeatherObservations: () => {},
  };
  const component = shallow(<ShipmentCard {...props} />);
  t.true(component.text().indexOf('Good weather') > 0, 'has weather info');
});
