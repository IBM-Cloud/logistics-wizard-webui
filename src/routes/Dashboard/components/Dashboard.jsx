import React from 'react';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';

export default class Dashboard extends React.PureComponent {
  render() {
    const {
      shipments,
      retailers,
      distributionCenters,
      weather,
      simulateWeather,
    } = this.props;

    return (
      <div className={classes.wrapper}>
        <div className={classes.pageContainer}>
          {retailers.length ? <DashboardTitle /> : <i className="fa fa-spinner fa-spin" />}
          <div className={classes.cardSection}>
            <CompletionCard />
            <ProgressCard />
            <AlertsCard />
          </div>
          <Map
            distributionCenters={distributionCenters}
            shipments={shipments}
            retailers={retailers}
            weather={weather}
            simulateWeather={simulateWeather}
          />
          <ShipmentsTable />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  demoName: React.PropTypes.string,
  shipments: React.PropTypes.array.isRequired,
  retailers: React.PropTypes.array.isRequired,
  distributionCenters: React.PropTypes.array.isRequired,
  weather: React.PropTypes.array.isRequired,
  token: React.PropTypes.string,
  simulateWeather: React.PropTypes.func.isRequired,
};
