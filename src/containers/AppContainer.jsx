import React, { PropTypes } from 'react';
import ReactGA from 'react-ga';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from 'styles/muiTheme';

ReactGA.initialize('UA-92026109-1'); // Unique Google Analytics tracking number

const AppContainer = (props) => {
  const { history, routes, store } = props;

  function logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
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
