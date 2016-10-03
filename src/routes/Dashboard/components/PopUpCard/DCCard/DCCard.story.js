import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DCCard from './DCCard';

const dc1 = {
  contact: {
    name: 'Joseph Smith',
  },
  id: 1,
  address: {
    state: 'Utah',
    city: 'Salt Lake City',
    country: 'US',
    latitude: 40.71,
    longitude: -111.9,
  },
};
const dc2 = {
  contact: {
    name: 'Mary Joe',
  },
  id: 3,
  address: {
    state: 'New York',
    city: 'Albany',
    country: 'US',
    latitude: 42.65,
    longitude: -73.75,
  },
};
storiesOf('DCCard', module)
  .add('dc1', () => (
    <DCCard
      dc={dc1}
    />
)).add('dc2', () => (
  <DCCard
    dc={dc2}
  />
  ));
