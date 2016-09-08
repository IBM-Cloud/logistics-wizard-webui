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
  watchGetDemoSession,
  watchLogin,
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

test('(Constant) LOGIN === "demos/LOGIN"', t => {
  t.is(LOGIN, 'demos/LOGIN');
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

test('(Action) login',
  actionTest(
    login,
    '1234',
    { type: LOGIN, userid: '1234' })
  );

test('(Action) loginSuccess',
  actionTest(
    loginSuccess,
    { token: { token: 'token' }, id: 'userid' },
    { type: LOGIN_SUCCESS, token: { token: 'token' }, id: 'userid' })
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

test('(Reducer) doesnt try to handle login Saga', reducerTest(
  demosReducer,
  {},
  login('1234'),
  {},
));

test('(Reducer) stores token on loginSuccess, and changes logged in user', reducerTest(
  demosReducer,
  {
    name: 'demo',
    guid: 'guid',
    token: 'old-token',
    users: [{
      id: 100,
      role: 'Supply Chain Manager',
      loggedIn: true,
    }, {
      id: 200,
      role: 'Retail Store Manager',
      location: 'Austin, Texas',
      loggedIn: false,
    }],
  },
  loginSuccess({ token: mockApi.login('new-token'), id: 200 }),
  {
    name: 'demo',
    guid: 'guid',
    token: 'new-token',
    users: [{
      id: 100,
      role: 'Supply Chain Manager',
      loggedIn: false,
    }, {
      id: 200,
      role: 'Retail Store Manager',
      location: 'Austin, Texas',
      loggedIn: true,
    }],
  },
));

test('(Reducer) adds demo session to state on getDemoSuccess', reducerTest(
  demosReducer,
  {},
  getDemoSuccess({
    demo: (() => {
      const demo = mockApi.getDemo({ name: 'demo', guid: 'guid' });
      demo.users.push(mockApi.getUser(200));
      return demo;
    })(),
    retailers: [
      mockApi.getRetailer({
        city: 'Austin',
        state: 'Texas',
        managerId: 200,
      }),
    ],
  }),
  {
    name: 'demo',
    guid: 'guid',
    users: [{
      id: 100,
      role: 'Supply Chain Manager',
    }, {
      id: 200,
      role: 'Retail Store Manager',
      location: 'Austin, Texas',
    }],
  },
));

test('(Saga) watchGetDemoSession - new Guid, API Success', t => {
  const saga = watchGetDemoSession();

  t.deepEqual(saga.next().value, take(GET_DEMO_SESSION));

  const newGuid = 'Another Guid';
  const action = getDemoSession(newGuid);
  t.deepEqual(saga.next(action).value, select(demoSelector));

  // Saga should see that our guid doesn't match, so fetches new demo and logs in.

  t.truthy(action.guid);
  const demoState = demosReducer({}, { type: '@@@@@' });
  t.deepEqual(
    saga.next(demoState).value,
    [call(api.getDemo, action.guid), call(api.getRetailers, action.guid)]
  );

  const demoPayload = mockApi.getDemo({ guid: newGuid });
  const retailersPayload = [mockApi.getRetailer()];
  t.deepEqual(
    saga.next([demoPayload, retailersPayload]).value,
    put(getDemoSuccess({ demo: demoPayload, retailers: retailersPayload }))
  );
  t.deepEqual(saga.next().value, put(login()));

  // Saga loops back to beginning
  t.deepEqual(saga.next().value, take(GET_DEMO_SESSION));
});

test.todo('(Saga) watchGetDemoSession - Write error handling logic');


test('(Saga) watchLogin - Not logged in, API Success', t => {
  const saga = watchLogin();
  const demo = mockApi.getDemo();
  demo.users.push(mockApi.getUser(200));
  const retailers = [mockApi.getRetailer({ managerId: 200 })];
  const demoState = demosReducer({}, getDemoSuccess({ demo, retailers }));

  t.deepEqual(saga.next().value, take(LOGIN));

  /*
  const action = login(100);
  t.deepEqual(saga.next(action).value, select(demoSelector));

  // Saga should see that our guid doesn't match, so fetches new demo and logs in.

  t.truthy(action.id);
  t.deepEqual(
    saga.next(demoState).value,
    [call(api.getDemo, action.guid), call(api.getRetailers, action.guid)]
  );

  t.deepEqual(
    saga.next([demoPayload, retailersPayload]).value,
    put(getDemoSuccess({ demo: demoPayload, retailers: retailersPayload }))
  );
  t.deepEqual(saga.next().value, put(login()));

  // Saga loops back to beginning
  t.deepEqual(saga.next().value, take(GET_DEMO_SESSION));
  */
});
