import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, select, put } from 'redux-saga/effects';
import { demosReducer, loginSuccess, receiveDemoSuccess, demoSelector } from 'modules/demos';
import api from 'services';
import mockApi from 'services/mockApi';
import {
  GET_ADMIN_DATA,
  ADMIN_DATA_RECEIVED,
  getAdminData,
  adminDataReceived,
  dashboardReducer,
  watchGetAdminData,
  dashboardSelector,
} from './Dashboard';

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
  adminDataReceived({ mockData: 'test' }),
  { mockData: 'test' },
));


test('(Reducer) doesnt try to handle saga', reducerTest(
  dashboardReducer,
  { mock: 'mock' },
  getAdminData,
  { mock: 'mock' },
));

test('(Saga) watchGetAdminData - Not logged in, API Success', t => {
  const saga = watchGetAdminData();
  let demoState = demosReducer({}, receiveDemoSuccess(mockApi.getDemo()));

  const newGuid = 'Another Guid';
  const action = getAdminData(newGuid);
  t.deepEqual(saga.next().value, take(GET_ADMIN_DATA));
  t.deepEqual(saga.next(action).value, select(demoSelector));

  // Saga should see that our guid doesn't match, so fetches new demo and logs in.

  t.truthy(action.guid);
  t.deepEqual(saga.next(demoState).value, call(api.getDemo, action.guid));

  const demoPayload = mockApi.getDemo(newGuid);
  t.deepEqual(saga.next(demoPayload).value, put(receiveDemoSuccess(demoPayload)));
  t.deepEqual(saga.next().value, select(demoSelector));
  demoState = demosReducer(demoState, receiveDemoSuccess(demoPayload));

  t.truthy(demoState.users[0].id);
  t.truthy(demoState.guid);
  t.deepEqual(saga.next(demoState).value, call(api.login, demoState.users[0].id, demoState.guid));
  const loginPayload = mockApi.login();
  t.deepEqual(saga.next(loginPayload).value, put(loginSuccess(loginPayload.token)));
  t.deepEqual(saga.next().value, select(demoSelector));
  demoState = demosReducer(demoState, loginSuccess(loginPayload.token));

  t.truthy(demoState.token);
  t.deepEqual(saga.next(demoState).value, call(api.getAdminData, demoState.token));
  const adminPayload = mockApi.getAdminData();
  t.deepEqual(saga.next(adminPayload).value, put(adminDataReceived(adminPayload)));

  // Saga loops back to beginning
  t.deepEqual(saga.next().value, take(GET_ADMIN_DATA));
});

test('(Saga) watchGetAdminData - Already logged in, API Success', t => {
  const saga = watchGetAdminData();
  let demoState = demosReducer({}, receiveDemoSuccess(mockApi.getDemo()));
  demoState = demosReducer(demoState, loginSuccess(mockApi.login().token));

  const action = getAdminData(demoState.guid);
  t.deepEqual(saga.next().value, take(GET_ADMIN_DATA));
  t.deepEqual(saga.next(action).value, select(demoSelector));

  // Saga should see that our guid already matches here, so goes straight to api.getAdminData

  t.truthy(demoState.token);
  t.deepEqual(saga.next(demoState).value, call(api.getAdminData, demoState.token));

  const adminPayload = mockApi.getAdminData();
  t.deepEqual(saga.next(adminPayload).value, put(adminDataReceived(adminPayload)));

  // Saga loops back to beginning
  t.deepEqual(saga.next().value, take(GET_ADMIN_DATA));
});


test.todo('Build a meaningful action around api failure.');
