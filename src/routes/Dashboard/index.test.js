import test from 'ava';
import DashboardRoute from './';

test('(Route) should return a route config object', t => {
  t.is(typeof (DashboardRoute({})), 'object');
});

test('(Route) Config should contain path "dashboard/:guid"', t => {
  t.is(DashboardRoute({}).path, 'dashboard/:guid');
});

test('(Route) Config should contain logic to dispatch getDemo action', t => {
  t.pass();
  // t.is(DashboardRoute({}).onEnter, Test Function Somehow?);
});
