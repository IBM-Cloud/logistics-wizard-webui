import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import GhostButton from './GhostButton';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<GhostButton label="Ghost Button" />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();
  t.is(component.find('RaisedButton').length, 1);
});
