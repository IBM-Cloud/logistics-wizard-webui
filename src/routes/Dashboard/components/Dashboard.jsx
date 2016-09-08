import React from 'react';
import classes from './Dashboard.scss';
import Map from './Map';

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    props.getAdminData(props.params.guid);
  }

  render() {
    return (
      <div className={classes.dashboard}>
        <h4>Dashboard</h4>
        <div className={classes.map}>
          <Map
            className={classes.map}
            distributionCenters={this.props.dbdata ? this.props.dbdata['distribution-centers'] : []}
            shipments={this.props.dbdata ? this.props.dbdata.shipments : []}
            retailers={this.props.dbdata ? this.props.dbdata.retailers : []}
          />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  demoName: React.PropTypes.string.isRequired,
  dbdata: React.PropTypes.object.isRequired,
  getAdminData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
