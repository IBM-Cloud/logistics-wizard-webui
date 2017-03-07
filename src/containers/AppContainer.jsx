import React, { PropTypes } from 'react';
import ReactGA from 'react-ga';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from 'styles/muiTheme';

ReactGA.initialize(__TRACKING_ID__); // Unique Google Analytics tracking number

const AppContainer = (props) => {
  const { history, routes, store } = props;

  function logPageView() {
    if (!__TRACKING_ID__) return;
    ReactGA.set({ page: window.location.href });
    ReactGA.pageview(window.location.href);
  }
  return (
    <Provider store={store}>
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <Router history={history} children={routes} onUpdate={logPageView} />
        </div>
      </MuiThemeProvider>
    </Provider>
  );
};

AppContainer.propTypes = {
  history: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default AppContainer;
