import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import { ForecastTile } from './ForecastTile';

const setup = () => {
  const spies = {
  };
  const props = {

  };
  const component = shallow(<ForecastTile {...props} />);

  return { spies, props, component };
};

test.todo('write tests for ForecastTile once complete.');
test('(Component) Renders with expected elements', t => {
  const { component } = setup();

  t.true(component.is('Table'),
    'is wrapped by a Table');
});
