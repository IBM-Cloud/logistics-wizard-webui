import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { PopUpCard } from './PopUpCard';

const props = {
  dashboard: {
    infoBox: {
      type: 'hidden',
    },
  },
  selectMarker: () => {},
};
test('(Component) Renders with expected elements', t => {
  const component = shallow(<PopUpCard {...props} />);
  t.true(component.is('div'), 'is wrapped by a div');
});

const propsForDc = {
  dashboard: {
    infoBox: {
      type: 'distributionCenter',
      data: {
        id: 1,
      },
    },
    shipments: [],
    retailers: [],
    'distribution-centers': [
      {
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
      },
    ],
  },
  selectMarker: () => {},
};

const propsForStorm = {
  dashboard: {
    infoBox: {
      type: 'storm',
      data: {
        id: 1,
      },
    },
    shipments: [],
    retailers: [],
    storms: [
      {
        event: {
          event_desc: 'Snow Storm',
          lat: 38.89,
          lon: -77.03,
          radiusInKm: 800,
          severity: 'Moderate',
        },
      },
    ],
  },
  selectMarker: () => {},
};
test('(Component) Renders a DC card', t => {
  const component = shallow(<PopUpCard {...propsForDc} />);
  t.is(component.find('DCCard').length, 1, 'has a DC Card');
});

test('(Component) Renders a Storm card', t => {
  const component = shallow(<PopUpCard {...propsForStorm} />);
  t.is(component.find('Connect(StormCard)').length, 1, 'has a Storm Card');
});
