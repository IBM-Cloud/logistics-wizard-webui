import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { simulateWeather, selectMarker } from '../modules/Dashboard';

const mapActionCreators = {
  simulateWeather,
  selectMarker,
};

const mapStateToProps = (state) => ({
  demoName: state.demoSession.name || 'loading...',
  infoBox: state.dashboard.infoBox,
  shipments: state.dashboard.shipments,
  retailers: state.dashboard.retailers,
  distributionCenters: state.dashboard['distribution-centers'],
  weather: state.dashboard.weather,
  token: state.demoSession.token,
});

export default connect(mapStateToProps, mapActionCreators)(Dashboard);
