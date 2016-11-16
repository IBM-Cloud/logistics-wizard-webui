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
    return (
      <div className={classes.dashboard}>
        <div className={classes.pageContainer}>
          {this.props.dbdata ? <DashboardTitle /> : <i className="fa fa-spinner fa-spin" />}
          <div className={classes.cardSection}>
            <CompletionCard />
            <ProgressCard />
            <AlertsCard />
          </div>
        </div>
        <Map
          distributionCenters={this.props.dbdata ? this.props.dbdata['distribution-centers'] : []}
          shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
          retailers={this.props.dbdata ? this.props.dbdata.retailers : []}
        />
        <div className={classes.pageContainer}>
          <ShipmentsTable />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  demoName: React.PropTypes.string,
  dbdata: React.PropTypes.object.isRequired,
};
