import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import LoadingSpinner from './LoadingSpinner';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<LoadingSpinner />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();
  t.is(component.find('CircularProgress').length, 1);
});
