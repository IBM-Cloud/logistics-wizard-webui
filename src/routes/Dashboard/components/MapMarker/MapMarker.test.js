import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import MapMarker from './MapMarker';

const setup = (aType) => {
  const spies = {
  };
  const props = {
    type: aType,
  };
  const component = shallow(<MapMarker {...props} />);

  return { spies, props, component };
};

test('(Component) Distribution Center has expected elements.', t => {
  const { component } = setup('distributionCenter');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa').length, 0, 'has no icon');
});

test('(Component) Retailer has expected elements.', t => {
  const { component } = setup('retailer');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa-circle').length, 1, 'has an icon');
});

test('(Component) Shipment has expected elements.', t => {
  const { component } = setup('shipment');

  t.true(component.is('div'), 'is wrapped by a div.');
  t.is(component.find('i.fa-truck').length, 1, 'has an icon');
});
