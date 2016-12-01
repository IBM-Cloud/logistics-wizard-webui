import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { simulateWeather } from '../modules/Dashboard';

const mapActionCreators = {
  simulateWeather,
};

const mapStateToProps = (state) => ({
  demoName: state.demoSession.name || 'loading...',
  shipments: state.dashboard.shipments,
  retailers: state.dashboard.retailers,
  distributionCenters: state.dashboard['distribution-centers'],
  weather: state.dashboard.weather,
  token: state.demoSession.token,
});

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
