import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import RoleItem from './RoleItem';

const retailManager = ({
  id = 2,
  role = 'retailstoremanager',
  location = 'Austin, TX',
  loggedIn = true,
} = {}) => ({ id, role, location, loggedIn });

const supplyManager = ({
  id = 1,
  role = 'supplychainmanager',
} = {}) => ({ id, role });

const setup = (user) => {
  const spies = {
    roleAction: sinon.spy(),
  };
  const props = {
    user,
    roleAction: spies.roleAction,
  };
  const component = shallow(<RoleItem {...props} />);

  return { component, props, spies };
};

test('(Component) Supply Chain Manager, not logged in, has expected elements.', t => {
  const { component } = setup(supplyManager());

  t.true(component.is('button'));
  t.false(component.hasClass('selected'));
  t.is(component.find('.fa-user').length, 1);
  t.is(component.find('.sublabel').length, 0);
  t.is(component.find('.light').length, 0);
  t.is(component.find('.small').length, 0);
});

test('(Component) Retail Store Manager, logged in, has expected elements.', t => {
  const { component, props } = setup(retailManager());

  t.true(component.is('button'));
  t.true(component.hasClass('selected'));
  t.is(component.find('.fa-user').length, 1);
  t.is(component.find('.sublabel').length, 1);
  t.is(component.find('.light').length, 0);
  t.is(component.find('.small').length, 0);
  t.regex(component.text(), new RegExp(props.user.location));
});

test('(Component) No user passed in, has expected elements.', t => {
  const { component } = setup();

  t.false(component.hasClass('selected'));
  t.is(component.find('.fa-plus').length, 1);
  t.is(component.find('.light').length, 1);
  t.is(component.find('.small').length, 1);
});
