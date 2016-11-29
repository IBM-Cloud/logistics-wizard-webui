import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import api from 'services';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';


export default class Dashboard extends React.PureComponent {
  simulateStorm = () => {
    api.simulateWeather(this.props.token).then((json) => {
      this.props.dbdata.storms = [json];
      this.forceUpdate();
    }
    );
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.pageContainer}>
          {this.props.dbdata ? <DashboardTitle /> : <i className="fa fa-spinner fa-spin" />}
          <div className={classes.cardSection}>
            <CompletionCard
              shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
            />
            <ProgressCard
              shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
            />
            <AlertsCard />
          </div>
          <Map
            distributionCenters={this.props.dbdata ? this.props.dbdata['distribution-centers'] : []}
            shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
            retailers={this.props.dbdata ? this.props.dbdata.retailers : []}
            storms={this.props.dbdata.storms ? this.props.dbdata.storms : []}
            simulateAction={this.simulateStorm}
            token={this.props.token}
          />
          <ShipmentsTable
            shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  demoName: React.PropTypes.string,
  dbdata: React.PropTypes.object.isRequired,
  token: React.PropTypes.string,
};
