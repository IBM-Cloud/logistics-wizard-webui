import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import LandingPage from './LandingPage';

const setup = () => {
  const spies = {
  };
  const props = {
  };
  const component = shallow(<LandingPage />);

  return { component, props, spies };
};

test('(Component) Has expected elements.', t => {
  const { component } = setup();
  t.is(component.find('LogisticsWizard').length, 1);
});
