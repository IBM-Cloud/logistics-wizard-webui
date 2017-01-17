import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import ForecastTile from './ForecastTile';

test('(Component) ForecastTile shows progress when no weather.', t => {
  const props = { };
  const component = shallow(<ForecastTile {...props} />);
  t.is(component.find('LoadingSpinner').length, 1, 'has a loading spinner');
  t.is(component.find('Table').length, 0, 'has no forecasts table');
});

test('(Component) ForecastTile shows table when weather.', t => {
  const props = {
    weather: {
      forecasts: [],
    },
  };
  const component = shallow(<ForecastTile {...props} />);
  t.is(component.find('LoadingSpinner').length, 0, 'has no loading spinner');
  t.is(component.find('Table').length, 1, 'has a forecasts table');
});
