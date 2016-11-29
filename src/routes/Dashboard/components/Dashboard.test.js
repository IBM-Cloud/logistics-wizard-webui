import test from 'ava';
import sinon from 'sinon';
import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';

const setup = () => {
  const spies = {
    simulateWeather: sinon.spy(),
  };
  const props = {
    demoName: 'Test Demo',
    shipments: [],
    retailers: [],
    distributionCenters: [],
    weather: [],
    token: '1234',
  };
  const component = shallow(<Dashboard {...props} />);

  return { spies, props, component };
};

test.todo('write tests for dashboard elements once complete.');
