import test from 'ava';
import nock from 'nock';
import {
  controllerApi,
  createDemo,
  getDemo,
  login,
  getRetailers,
  getAdminData,
} from '../services';

test('(API) createDemo', function *(t) {
  t.plan(2);

  const endpoint = '/demos';
  const success = { id: 123, name: 'demo' };

  nock(controllerApi)
    .post(endpoint, {
      name: 'demo',
      email: 'email@company.com',
    })
    .reply(200, success);

  const response = yield createDemo('demo', 'email@company.com');
  t.deepEqual(response, success);

  const fail = { message: 'Invalid email address' };
  nock(controllerApi)
    .post(endpoint, {
      name: 'demo',
      email: 'bademail',
    })
    .reply(422, fail);

  try {
    yield createDemo('demo', 'bademail');
  }
  catch (error) {
    t.deepEqual(error, fail);
  }
});

test('(API) getDemo', function *(t) {
  t.plan(2);

  const guid = '1234';
  const endpoint = `/demos/${guid}`;
  const success = { guid, id: 123, name: 'demo' };

  nock(controllerApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getDemo(guid);
  t.deepEqual(response, success);

  const fail = { message: 'Demo does not exist' };
  nock(controllerApi)
    .get('/demos/1111')
    .reply(404, fail);

  try {
    yield getDemo('1111');
  }
  catch (error) {
    t.deepEqual(error, fail,
      'promise should fail with api message as the error');
  }
});

test('(API) login', function *(t) {
  t.plan(2);

  const userId = '26';
  const guid = '1234';
  const endpoint = `/demos/${guid}/login`;
  const success = { token: 'logintoken' };

  nock(controllerApi)
    .post(endpoint, { userId })
    .reply(200, success);

  const response = yield login(userId, guid);
  t.deepEqual(response, success);

  const fail = { message: 'Demo or user does not exist' };
  nock(controllerApi)
    .post(endpoint, { userId })
    .reply(404, fail);

  try {
    yield login(userId, guid);
  }
  catch (error) {
    t.deepEqual(error, fail,
      'promise should fail with api message as the error');
  }
});

test('(API) getRetailers', function *(t) {
  t.plan(2);

  const guid = '1234';
  const endpoint = `/demos/${guid}/retailers`;
  const success = [1, 2, 3];

  nock(controllerApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getRetailers(guid);
  t.deepEqual(response, success);

  const fail = { message: 'Demo does not exist' };
  nock(controllerApi)
    .get(endpoint)
    .reply(404, fail);

  try {
    yield getRetailers(guid);
  }
  catch (error) {
    t.deepEqual(error, fail,
      'promise should fail with api message as the error');
  }
});

test('(API) getAdminData', function *(t) {
  t.plan(2);

  const token = '1234';
  const endpoint = '/admin';
  const success = { mockData: 'blahblah' };

  nock(controllerApi)
    .get(endpoint)
    .reply(200, success);

  const response = yield getAdminData(token);
  t.deepEqual(response, success);

  const fail = { message: 'Unauthorized' };
  nock(controllerApi)
    .get(endpoint)
    .reply(401, fail);

  try {
    yield getAdminData(token);
  }
  catch (error) {
    t.deepEqual(error, fail,
      'promise should fail with api message as the error');
  }
});
