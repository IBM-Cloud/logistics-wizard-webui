import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { RetailerCard } from './RetailerCard';

const resolver = {
  resolve: (type, id) => `${type} ${id}`,
};

const props1 = {
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
const props2 = {
  retailer: {
    id: 1262,
    managerId: null,
    address: {
      state: 'Texas',
      city: 'Austin',
      country: 'US',
      latitude: 30.22,
      longitude: -97.74,
    },
  },
};
storiesOf('RetailerCard', module)
  .add('retailer1', () => (
    <RetailerCard {...props1} idToNameResolver={resolver} />
)).add('retailer2', () => (
  <RetailerCard {...props2} idToNameResolver={resolver} />
));
