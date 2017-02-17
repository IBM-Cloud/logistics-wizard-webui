import React from 'react';
import { storiesOf } from '@kadira/storybook';
import DCCard from './DCCard';

const resolver = {
  resolve: (type, id) => `${type} ${id}`,
};

const dc1 = {
  contact: 'Joseph Smith',
  id: 1,
  address: {
    state: 'Utah',
    city: 'Salt Lake City',
    country: 'US',
    latitude: 40.71,
    longitude: -111.9,
  },
  shipments: [
    {
      id: '089124',
      status: 'In Transit',
    },
    {
      id: '089125',
      status: 'In Transit',
    },
    {
      id: '089126',
      status: 'In Transit',
    },
  ],
};

storiesOf('DCCard', module)
  .add('dc1', () => (
    <DCCard
      contact={dc1.contact} id={dc1.id}
      address={dc1.address} shipments={dc1.shipments}
      idToNameResolver={resolver}
    />
  ));
