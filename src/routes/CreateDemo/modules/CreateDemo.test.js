import test from 'ava';
import { reducerTest, actionTest } from 'redux-ava';
import { call, take, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import api from 'services';
import mockApi from 'services/mockApi';
import {
  CREATE_DEMO,
  CREATE_DEMO_FAILURE,
  createDemo,
  createDemoFailure,
  createDemoReducer,
  watchCreateDemo,
  createDemoSelector,
} from './CreateDemo';

test('(Selector) returns the slice of state for createDemo.', t => {
  t.deepEqual(createDemoSelector({ createDemo: { stuff: '123' } }), { stuff: '123' });
});

test('(Constant) CREATE_DEMO === "CreateDemo/CREATE_DEMO"', t => {
  t.is(CREATE_DEMO, 'CreateDemo/CREATE_DEMO');
});

test('(Constant) CREATE_DEMO_FAILURE === "CreateDemo/CREATE_DEMO_FAILURE"', t => {
  t.is(CREATE_DEMO_FAILURE, 'CreateDemo/CREATE_DEMO_FAILURE');
});

test('(Action) createDemo',
  actionTest(
    createDemo,
    { name: 'name' },
    { type: CREATE_DEMO, payload: { name: 'name', guid: undefined } }),
  );

test('(Action) createDemo',
  actionTest(
    createDemo,
    { name: 'name', guid: '123abc' },
    { type: CREATE_DEMO, payload: { name: 'name', guid: '123abc' } }),
  );

test('(Action) createDemoFailure',
  actionTest(
    createDemoFailure,
    { message: 'bad email' },
    { type: CREATE_DEMO_FAILURE, payload: { message: 'bad email' } })
  );

test('(Reducer) initializes with empty state', t => {
  t.deepEqual(createDemoReducer(undefined, {}), {});
});

test('(Reducer) return previous state when no action is matched', reducerTest(
  createDemoReducer,
  { mock: 'mock' },
  { type: '@@@@@@@' },
  { mock: 'mock' },
));

test('(Reducer) adds error to the state on createDemoFailure.', reducerTest(
  createDemoReducer,
  {},
  createDemoFailure({ message: 'invalid email' }),
  { error: 'invalid email' },
));


test('(Reducer) doesnt try to handle saga', reducerTest(
  createDemoReducer,
  { mock: 'mock' },
  createDemo,
  { mock: 'mock' },
));

test('(Saga) watchCreateDemo - Guid given', t => {
  const saga = watchCreateDemo();
  const action = createDemo({ guid: '123abc' });

  t.deepEqual(saga.next().value, take(CREATE_DEMO));
  t.deepEqual(saga.next(action).value, put(push(`/dashboard/${action.payload.guid}`)));

  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'saga resets, and begins listening for CREATE_DEMO again.');
});


test('(Saga) watchCreateDemo - API Success', t => {
  const saga = watchCreateDemo();
  const action = createDemo();

  t.deepEqual(saga.next().value, take(CREATE_DEMO));
  t.deepEqual(saga.next(action).value, call(api.createDemo, action.name));

  const response = mockApi.getDemo();
  t.deepEqual(saga.next(response).value, put(push(`/dashboard/${response.guid}`)));

  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'saga resets, and begins listening for CREATE_DEMO again.');
});

test.todo('Build a meaningful action around api failure.');
test('(Saga) watchCreateDemo - API Failure', t => {
  const saga = watchCreateDemo();
  const action = createDemo();

  t.deepEqual(saga.next().value, take(CREATE_DEMO));
  t.deepEqual(saga.next(action).value, call(api.createDemo, action.name));

  const error = { message: 'bad email' };
  t.deepEqual(saga.throw(error).value, put(createDemoFailure(error)),
    'dispatches createDemoFailure if api call fails.');
  t.deepEqual(saga.next().value, take(CREATE_DEMO),
    'saga resets, and begins listening for CREATE_DEMO again.');
});
