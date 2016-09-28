import { injectReducer } from 'store/reducers';
import { injectSagas } from 'store/sagas';
import { getDemoSession } from 'modules/demos';

export default (store) => ({
  path: 'dashboard/:guid',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Dashboard = require('./containers/DashboardContainer').default;
      const reducer = require('./modules/Dashboard').default;
      const sagas = require('./modules/Dashboard').sagas;

      injectReducer(store, { key: 'dashboard', reducer });
      injectSagas(store, { key: 'dashboard', sagas });

      store.dispatch(getDemoSession(nextState.params.guid));
      cb(null, Dashboard);
    }, 'dashboard');
  },
});
