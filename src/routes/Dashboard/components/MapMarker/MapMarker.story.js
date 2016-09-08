import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import MapMarker from './MapMarker';

storiesOf('MapMarker', module)
  .add('distributionCenter', () => (
    <MapMarker
      type="distributionCenter"
    />
  ))
  .add('retailer', () => (
    <MapMarker
      type="retailer"
    />
  ))
  .add('shipment', () => (
    <MapMarker
      type="shipment"
    />
  ));
