import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import MapMarker from './MapMarker';


const setup = (aType) => {
  const spies = {
  };
  const props = {
    type: aType,
    data: {
      event: {
        event_desc: 'Snow Storm',
        lat: 38.89,
        lon: -77.03,
        radiusInKm: 800,
        severity: 'Moderate',
      },
    },
    selectMarker() {},
    lat: 38.89,
    lng: -77.03,
  };
  const component = shallow(<MapMarker {...props} />);

  return { spies, props, component };
};

test('(Component) Distribution Center has expected elements.', t => {
  const { component } = setup('distributionCenter');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa-star').length, 1, 'has an icon');
});

test('(Component) Retailer has expected elements.', t => {
  const { component } = setup('retailer');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa-map-marker').length, 1, 'has an icon');
});

test('(Component) Shipment has expected elements.', t => {
  const { component } = setup('shipment');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa-truck').length, 1, 'has an icon');
});

test('(Component) Shipment has expected elements.', t => {
  const { component } = setup('storm');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('img.weatherIcon').length, 1, 'has an icon');
});
