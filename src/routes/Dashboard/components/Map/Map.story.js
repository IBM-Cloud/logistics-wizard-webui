import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { Map } from './Map';

storiesOf('Map', module)
  .add('empty', () => (
    <Map />
  ))
  .add('with data', () => (
    <Map
      distributionCenters={[
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
        {
          address: {
            city: 'Cincinnati',
            state: 'Ohio',
            country: 'US',
            latitude: 39.10,
            longitude: -84.49,
          },
          contact: {
            name: 'Joseph Smith',
          },
        },
      ]}
      shipments={[
        {
          status: 'APPROVED',
          currentLocation: {
            city: 'Memphis',
            state: 'Tennessee',
            country: 'US',
            latitude: 35.19,
            longitude: -90.02,
          },
        },
      ]}
      retailers={[
        {
          address: {
            city: 'Austin',
            state: 'Texas',
            country: 'US',
            latitude: 30.22,
            longitude: -97.74,
          },
        },
      ]}
      storms={[
        {
          event: {
            event_desc: 'Snow Storm',
            lat: 38.89,
            lon: -77.03,
            radiusInKm: 800,
            severity: 'Moderate',
          },
        },
      ]}
    />
  ));
