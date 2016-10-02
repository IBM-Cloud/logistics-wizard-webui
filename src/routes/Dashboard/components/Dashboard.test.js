import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

const setup = () => {
  const spies = {
  };
  const props = {
    demoName: 'Test Demo',
    dbdata: { fakeData: 'fake stuff' },
  };
  const component = shallow(<Dashboard {...props} />);

  return { spies, props, component };
};

test.todo('write tests for dashboard elements once complete.');
test('(Component) Renders with expected elements', t => {
  const { component } = setup();

  t.is(component.find('Map').length, 1,
    'has map');
});
