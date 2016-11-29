import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import DashboardRoute from './Dashboard';

export const createRoutes = (store) => ({
  path: '/',
  indexRoute: Home,
  childRoutes: [
    { component: CoreLayout,
      childRoutes: [
        DashboardRoute(store),
      ],
    },
  ],
});

export default createRoutes;
