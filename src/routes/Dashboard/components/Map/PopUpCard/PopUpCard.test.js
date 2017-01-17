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
