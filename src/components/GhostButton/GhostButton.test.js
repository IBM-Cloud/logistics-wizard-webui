import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import GhostButton from './GhostButton';

const setup = () => {
  const props = {};
  const component = shallow(<GhostButton {...props} />);

  return { props, component };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();

  t.true(component.is('RaisedButton'));
});

test.todo('Add Primary3Color to GhostButton styles!');
test.todo('Add Light / Dark property options!');
