import React from 'react';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';

export const Dashboard = ({
  shipments,
  retailers,
  distributionCenters,
  weather,
  simulateWeather,
  selectMarker,
  infoBox,
}) => (
  <div className={classes.wrapper}>
    <div className={classes.pageContainer}>
      {retailers.length ? <DashboardTitle /> : <i className="fa fa-spinner fa-spin" />}
      <div className={classes.cardSection}>
        <CompletionCard shipments={shipments} />
        <ProgressCard shipments={shipments} />
        <AlertsCard storms={weather} />
      </div>
      <Map
        selectMarker={selectMarker}
        infoBox={infoBox}
        distributionCenters={distributionCenters}
        shipments={shipments}
        retailers={retailers}
        weather={weather}
        simulateWeather={simulateWeather}
      />
      <ShipmentsTable shipments={shipments} />
    </div>
  </div>
);

Dashboard.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  infoBox: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  }).isRequired,
  demoName: React.PropTypes.string,
  shipments: React.PropTypes.array.isRequired,
  retailers: React.PropTypes.array.isRequired,
  distributionCenters: React.PropTypes.array.isRequired,
  weather: React.PropTypes.array.isRequired,
  token: React.PropTypes.string,
  simulateWeather: React.PropTypes.func.isRequired,
};

export default Dashboard;
