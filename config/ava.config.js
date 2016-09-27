/* eslint-disable */

import { argv } from 'yargs';
import fs from 'fs';
import config from '../config';
import injectTapEventPlugin from 'react-tap-event-plugin';

Object.keys(config.globals).forEach(key => {
  if(typeof (config.globals[key]) === 'string') {
    config.globals[key] = config.globals[key].replace(/['"]+/g, '');
  };
});

Object.assign(global, config.globals);

// Needed to avoid errors with requiring css modules from js
const mockCssModules = require('mock-css-modules');
mockCssModules.register(['.sass', '.scss']);

// Since fetch doesn't work in node, this is needed for testing api calls
require('isomorphic-fetch');

// Ignore assets
require.extensions['.jpg'] = noop => noop;
require.extensions['.jpeg'] = noop => noop;
require.extensions['.png'] = noop => noop;
require.extensions['.gif'] = noop => noop;
require.extensions['.svg'] = noop => noop;

// Set up dom
const storageMock = () => {
  const storage = {};

  return {
    setItem: function(key, value) {
      storage[key] = value || '';
    },
    getItem: function(key) {
      return storage[key] || null;
    },
    removeItem: function(key) {
      delete storage[key];
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: function(i) {
      var keys = Object.keys(storage);
      return keys[i] || null;
    }
  };
}

require.extensions['.html'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
}

global.document = require('jsdom').jsdom(require('../src/index.html'));
global.window = document.defaultView;
global.window.localStorage = storageMock();
global.window.sessionStorage = storageMock();
global.navigator = window.navigator;


injectTapEventPlugin(); // for component tests using onTouchTap event
