import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, select, put } from 'redux-saga/effects';
import { loginSuccess, receiveDemoSuccess } from 'modules/demos';
import api from 'services';
import {
  GET_ADMIN_DATA,
  ADMIN_DATA_RECEIVED,
  getAdminData,
  adminDataReceived,
  dashboardReducer,
  watchGetAdminData,
  dashboardSelector,
} from './Dashboard';

const adminDataPayload = () => ({
  stores: [{ store: 'store stuff' }],
  shipments: [{ shipment: 'shipment stuff' }],
});


test('(Selector) returns the slice of state for dashboard.', t => {
  t.deepEqual(dashboardSelector({ dashboard: { id: '123' } }), { id: '123' });
});

test('(Constant) GET_ADMIN_DATA === "Dashboard/GET_ADMIN_DATA"', t => {
  t.is(GET_ADMIN_DATA, 'Dashboard/GET_ADMIN_DATA');
});

test('(Constant) ADMIN_DATA_RECEIVED === "Dashboard/ADMIN_DATA_RECEIVED"', t => {
  t.is(ADMIN_DATA_RECEIVED, 'Dashboard/ADMIN_DATA_RECEIVED');
});

test('(Action) getAdminData',
  actionTest(
    getAdminData,
    'guid string',
    { type: GET_ADMIN_DATA, guid: 'guid string' })
  );

test('(Action) getAdminData',
  actionTest(
    adminDataReceived,
    { stores: [{ data: 'data' }] },
    { type: ADMIN_DATA_RECEIVED, payload: { stores: [{ data: 'data' }] } })
  );

test('(Reducer) initializes with empty state', t => {
  t.deepEqual(dashboardReducer(undefined, {}), {});
});

test('(Reducer) return previous state when no action is matched', reducerTest(
  dashboardReducer,
  { mock: 'mock' },
  { type: '@@@@@@@' },
  { mock: 'mock' },
));

test('(Reducer) spreads payload to state on adminDataReceived', reducerTest(
  dashboardReducer,
  {},
  adminDataReceived(adminDataPayload()),
  adminDataPayload(),
));


test('(Reducer) doesnt try to handle saga', reducerTest(
  dashboardReducer,
  { mock: 'mock' },
  getAdminData,
  { mock: 'mock' },
));

/*
test('(Saga) watchGetAdminData - API Success', t => {
  const saga = watchGetAdminData();
  const payload = adminDataPayload();
  const createDemoAction = getAdminData(payload);
  const demoSession = { mockResponse: 'blah blah' };
  const demoState = { guid: '1234' };

  t.deepEqual(saga.next().value, take(GET_ADMIN_DATA),
    'listens for GET_ADMIN_DATA action.');
  t.deepEqual(saga.next(createDemoAction).value, call(api.createDemo, payload.name, payload.email),
    'calls api with action payload as params.');
  t.deepEqual(saga.next(demoSession).value, put(receiveDemoSuccess(demoSession)),
    'dispatches receiveDemoSuccess action.');
  t.deepEqual(saga.next().value, select(demoSelector),
    'gets the updated state.');
  t.deepEqual(saga.next(demoState).value, put(push(`/dashboard/${demoState.guid}`)),
    'dispatches route change to dashboard');
  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'saga resets, and begins listening for CREATE_DEMO again.');
});

test.todo('Build a meaningful action around api failure.');
test('(Saga) watchCreateDemo - API Failure', t => {
  const saga = watchCreateDemo();
  const payload = { name: 'test demo', email: 'name@email.com' };
  const createDemoAction = createDemo(payload);
  const error = { message: 'bad email' };

  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'listens for CREATE_DEMO action.');
  t.deepEqual(saga.next(createDemoAction).value, call(api.createDemo, payload.name, payload.email),
    'calls api with action payload as params.');
  t.deepEqual(saga.throw(error).value, put(createDemoFailure(error)),
    'dispatches createDemoFailure if api call fails.');
  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'saga resets, and begins listening for CREATE_DEMO again.');
});
*/
