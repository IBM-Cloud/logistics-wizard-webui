import React from 'react';
import { storiesOf } from '@kadira/storybook';
import RetailerCard from './RetailerCard';

const retailer1 = {
  id: 1261,
  managerId: null,
  address: {
    state: 'North Carolina',
    city: 'Raleigh',
    country: 'US',
    latitude: 35.71,
    longitude: -78.63,
  },
};
const retailer2 = {
  id: 1262,
  managerId: null,
  address: {
    state: 'Texas',
    city: 'Austin',
    country: 'US',
    latitude: 30.22,
    longitude: -97.74,
  },
};
storiesOf('RetailerCard', module)
  .add('retailer1', () => (
    <RetailerCard
      retailer={retailer1}
    />
)).add('retailer2', () => (
  <RetailerCard
    retailer={retailer2}
  />
  ));
