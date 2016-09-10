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
  const { component, props } = setup();

  t.regex(component.find('p').first().text(), new RegExp(props.demoName, 'g'),
    'renders demo name from props');
});
