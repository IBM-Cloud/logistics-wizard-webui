import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import GlobalNav from './GlobalNav';

const setup = () => {
  const spies = {
  };
  const props = {
    users: [
      {
        role: 'supplychainmanager',
        loggedIn: true,
      },
      {
        role: 'retailstoremanager',
        location: 'Austin, TX',
      },
    ],
  };
  const component = shallow(<GlobalNav {...props} />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component, props } = setup();

  t.is(component.find('RoleSwitcher').length, 1);
  t.deepEqual(component.find('RoleSwitcher').first().props().users, props.users);
  t.is(component.find('Link').length, 1);
  t.is(component.find('Link').first().props().to, '/');
});
