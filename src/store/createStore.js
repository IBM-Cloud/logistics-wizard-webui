import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { sagas as demosSagas } from 'modules/demos';
import makeRootReducer from './reducers';
import { makeRootSaga, injectSagas } from './sagas';

export default (initialState = {}, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware, routerMiddleware(history)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  store.asyncSagas = {};
  store.runSaga = (saga) => {
    sagaMiddleware.run(saga);
  };
  store.runSaga(makeRootSaga(store.asyncSagas));

  // inject the base sagas to login/logout of a demo session
  // demoSagas are considered "default sagas" registered right from the start
  // other sagas linked to a route (like the dashboard sagas)
  // are registered by the route code by calling injectSagas.
  injectSagas(store, { key: 'demos', sagas: demosSagas });

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;

      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};
