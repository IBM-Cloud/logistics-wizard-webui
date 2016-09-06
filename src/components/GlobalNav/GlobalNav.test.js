import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import GlobalNav from './GlobalNav';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<GlobalNav />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();

  t.is(component.find('Connect(RoleSwitcher)').length, 1);
  t.is(component.find('Link').length, 1);
  t.is(component.find('Link').first().props().to, '/');
});
