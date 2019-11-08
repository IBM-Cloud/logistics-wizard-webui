import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { ShipmentCard } from './ShipmentCard';

const resolver = {
  resolve: (type, id) => `${type} ${id}`,
};

const props1 = {
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
};
const shipment2 = {
  toId: 473,
  estimatedTimeOfArrival: '2016-10-16T00:00:00.000Z',
  status: 'NEW',
  updatedAt: null,
  currentLocation: null,
  fromId: 2,
  deliveredAt: null,
  createdAt: '2016-09-08T20:05:30.001Z',
  id: 827,
};
storiesOf('ShipmentCard', module)
  .add('shipment1', () => (
    <ShipmentCard
      {...props1}
      idToNameResolver={resolver}
    />
)).add('shipment2', () => (
  <ShipmentCard
    shipment={shipment2}
    idToNameResolver={resolver}
  />
  ));
