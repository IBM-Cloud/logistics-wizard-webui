import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import RoleSwitcher from './RoleSwitcher';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<RoleSwitcher />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();
  t.is(component.find('div').length, 1);
  t.is(component.find('LoadingSpinner').length, 1);
});
