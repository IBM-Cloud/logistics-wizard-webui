import test from 'ava';
import HomeRoute from './';

test('should return a route config object', t => {
  t.is(typeof (HomeRoute), 'object');
});
