import test from 'ava';
import sinon from 'sinon';
import CreateDemoRoute from './';

test('(Route) returns a route config object', t => {
  t.is(typeof (CreateDemoRoute({})), 'object');
});

test('(Route) has path "create-demo"', t => {
  t.is(CreateDemoRoute({}).path, 'create-demo');
});

test('(Route) onEnter - does nothing if savedGuid does not exist in localStorage.', t => {
  const replaceStateSpy = sinon.spy();
  const nextState = { location: { pathname: 'mock' } };

  CreateDemoRoute({}).onEnter(nextState, replaceStateSpy);
  t.false(replaceStateSpy.calledOnce);
});

test('(Route) onEnter - redirects to dashboard if a guid exists in localStorage.', t => {
  const replaceStateSpy = sinon.spy();
  const nextState = { location: { pathname: 'mock' } };
  window.localStorage.setItem('savedGuid', '123abc');

  CreateDemoRoute({}).onEnter(nextState, replaceStateSpy);
  t.true(replaceStateSpy.withArgs({ nextPathname: 'mock' }, '/dashboard/123abc').calledOnce);
});
