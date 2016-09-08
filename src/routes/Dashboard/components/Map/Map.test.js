import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<Map {...props} />);

  return { spies, props, component };
};

test('(Component) Has expected elements.', t => {
  const { props, component } = setup();

  t.true(true);
});
