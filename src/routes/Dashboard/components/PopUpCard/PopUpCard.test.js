import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import PopUpCard from './PopUpCard';

const setup = () => {
  const spies = {
  };
  const props = {
    shipment: {
      toId: 462,
      estimatedTimeOfArrival: '2016-10-22T00:00:00.000Z',
      status: 'DELIVERED',
      updatedAt: '2016-10-20T12:15:37.000Z',
      currentLocation: {
        state: 'Texas',
        latitude: 32.74,
        country: 'US',
        longitude: -96.8,
        city: 'Dallas',
      },
      fromId: 2,
      deliveredAt: null,
      createdAt: '2016-09-08T16:26:16.933Z',
      id: 810,
    },
  };
  const component = shallow(<PopUpCard {...props} />);

  return { spies, props, component };
};

test.todo('write tests for PopUpCard once complete.');
test('(Component) Renders with expected elements', t => {
  const { props, component } = setup();

  t.true(component.is('Paper'),
    'is wrapped by a Paper');
  t.regex(component.find('p').first().text(), new RegExp(props.demoName, 'g'),
    'renders demo name from props');
});
