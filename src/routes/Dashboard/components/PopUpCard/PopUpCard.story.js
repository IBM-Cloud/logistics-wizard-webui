import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import PopUpCard from './PopUpCard';

var shipment = {
      "toId": 462,
      "estimatedTimeOfArrival": "2016-10-22T00:00:00.000Z",
      "status": "DELIVERED",
      "updatedAt": "2016-10-20T12:15:37.000Z",
      "currentLocation": {
        "state": "Texas",
        "latitude": 32.74,
        "country": "US",
        "longitude": -96.8,
        "city": "Dallas"
      },
      "fromId": 2,
      "deliveredAt": null,
      "createdAt": "2016-09-08T16:26:16.933Z",
      "id": 810
    };
storiesOf('PopUpCard', module)
  .add('default state', () => (
    <PopUpCard
      location={shipment.currentLocation}
      title={shipment.id ? `Shipment ${shipment.id.toString()}` : '...'}
      status={shipment.status || '...'}
    />
  ));
