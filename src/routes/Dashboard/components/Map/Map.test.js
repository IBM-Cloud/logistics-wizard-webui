import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import Map from './Map';

const testDistributionCenters = [
  {
    address: {
      city: 'Salt Lake City',
      state: 'Utah',
      country: 'US',
      latitude: 40.71,
      longitude: -111.90,
    },
    contact: {
      name: 'Joseph Smith',
    },
  },
];

const testRetailers = [
  {
    address: {
      city: 'Memphis',
      state: 'Tennessee',
      country: 'US',
      latitude: 35.19,
      longitude: -90.02,
    },
    contact: {
      name: 'Joseph Smith',
    },
  },
];

const testShipments = [
  {
    status: 'IN_TRANSIT',
    fromId: '3',
    toId: '204',
    currentLocation: {
      city: 'Albany',
      state: 'New York',
      country: 'US',
      latitude: 42.65,
      longitude: -73.75,
    },
    estimatedTimeOfArrival: 'Thu, 28 Oct 2016',
    updatedAt: 'Thu, 27 Oct 2016 12:15:37 GMT',
  },
];

const setup = (someProps) => {
  const props = someProps;
  const component = shallow(<Map {...props} />);
  return { component, props };
};

test.todo('write tests for dashboard elements once complete.');

// TODO: Need to create a mock store for connect to work.
// test('(Component) Has no markers by default.', t => {
//   const { component } = setup({});
//   t.is(component.find('MapMarker').length, 0);
// });

// test('(Component) Has 3 markers.', t => {
//   const { component } = setup({
//     distributionCenters: testDistributionCenters,
//     retailers: testRetailers,
//     shipments: testShipments,
//   });
//   t.is(component.find('MapMarker').length, 3);
// });
