import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, select, put } from 'redux-saga/effects';
import api from 'services';
import mockApi from 'services/mockApi';
import {
  GET_DEMO_SESSION,
  GET_DEMO_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN,
  getDemoSession,
  getDemoSuccess,
  login,
  loginSuccess,
  demosReducer,
  demoSelector,
} from './demos';


test('(Selector) returns the slice of state for demos.', t => {
  t.deepEqual(demoSelector({ demoSession: { id: '123' } }), { id: '123' });
});

test('(Constant) GET_DEMO_SESSION === "demos/GET_DEMO_SESSION"', t => {
  t.is(GET_DEMO_SESSION, 'demos/GET_DEMO_SESSION');
});

test('(Constant) GET_DEMO_SUCCESS === "demos/GET_DEMO_SUCCESS"', t => {
  t.is(GET_DEMO_SUCCESS, 'demos/GET_DEMO_SUCCESS');
});

test('(Constant) LOGIN_SUCCESS === "demos/LOGIN_SUCCESS"', t => {
  t.is(LOGIN_SUCCESS, 'demos/LOGIN_SUCCESS');
});

test('(Action) getDemoSession',
  actionTest(
    getDemoSession,
    '1234',
    { type: GET_DEMO_SESSION, guid: '1234' })
  );

test('(Action) getDemoSuccess',
  actionTest(
    getDemoSuccess,
    { demo: 'test', retailers: [1, 2, 3] },
    { type: GET_DEMO_SUCCESS, demo: 'test', retailers: [1, 2, 3] })
  );

test('(Action) loginSuccess',
  actionTest(
    loginSuccess,
    { name: 'test' },
    { type: LOGIN_SUCCESS, payload: { name: 'test' } })
  );

test('(Reducer) initializes with empty state', t => {
  t.deepEqual(demosReducer(undefined, {}), {});
});

test('(Reducer) return previous state when no action is matched', reducerTest(
  demosReducer,
  {},
  { type: '@@@@@@@' },
  {},
));

test('(Reducer) doesnt try to handle getDemoSession Saga', reducerTest(
  demosReducer,
  {},
  getDemoSession('1234'),
  {},
));

test('(Reducer) stores token on loginSuccess', reducerTest(
  demosReducer,
  {},
  loginSuccess('login-token'),
  { token: 'login-token' },
));

const demoSession = () => ({
  name: 'demo',
  guid: 'guid',
  id: 'demoid',
  users: [{
    id: 'userid',
    username: 'johndoe',
    roles: [{ name: 'supplychainmanager' }],
  }, {
    id: 'userid2',
    username: 'jane',
    roles: [{ name: 'retailstoremanager' }],
  }],
});

const retailers = () => ([
  {
    managerId: 'userid2',
    address: {
      state: 'Texas',
      city: 'Austin',
      latitude: 30.22,
      country: 'US',
      longitude: -97.74,
    },
    id: 405,
  },
]);

test('(Reducer) adds demo session to state on getDemoSuccess', reducerTest(
  demosReducer,
  {},
  getDemoSuccess({ demo: demoSession(), retailers: retailers() }),
  {
    name: 'demo',
    guid: 'guid',
    users: [{
      id: 'userid',
      role: 'Supply Chain Manager',
    }, {
      id: 'userid2',
      role: 'Retail Store Manager',
      location: 'Austin, Texas',
    }],
  },
));

test('(Saga) watchGetDemoSession - Not logged in, API Success', t => {
  const saga = getDemoSession();

  const newGuid = 'Another Guid';
  const action = getDemoSession(newGuid);
  t.deepEqual(saga.next().value, take(GET_DEMO_SESSION));
  t.deepEqual(saga.next(action).value, select(demoSelector));

  // Saga should see that our guid doesn't match, so fetches new demo and logs in.

  t.truthy(action.guid);
  const demoState = demosReducer({}, getDemoSuccess(mockApi.getDemo()));
  t.deepEqual(
    saga.next(demoState).value,
    [call(api.getDemo, action.guid), call(api.getRetailers, action.guid)]
  );

  const demoPayload = mockApi.getDemo(newGuid);
  const retailersPayload = mockApi.getRetailers(newGuid);
  t.deepEqual(
    saga.next([demoPayload, retailersPayload]).value,
    put(getDemoSuccess({ demoPayload, retailersPayload }))
  );
  t.deepEqual(saga.next().value, put(login()));

  // Saga loops back to beginning
  t.deepEqual(saga.next().value, take(GET_DEMO_SESSION));
});
