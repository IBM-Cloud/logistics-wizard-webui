import React from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';
import NumberCard from './NumberCard';

const visibleTab = {
  display: 'flex',
  flexGrow: 1,
};

const invisibleTab = {
  display: 'flex',
  flexGrow: 0,
  height: 0,
  margin: 0,
  overflow: 'hidden',
};

class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.setMapMode = this.setMapMode.bind(this);
    this.setListMode = this.setListMode.bind(this);
  }

  componentWillMount() {
    this.setState({ viewMode: 'map' });
  }

  setMapMode() {
    this.setState({ viewMode: 'map' });
  }

  setListMode() {
    this.setState({ viewMode: 'list' });
  }

  render() {
    return (
      <div className={classes.wrapper}>
        <div className={classes.cardSection}>
          <NumberCard
            label="Shipments Completed"
            icon="truck"
            value={this.props.dashboard.shipments.filter(
              shipment => (shipment.status === 'DELIVERED')).length}
          />
          <NumberCard
            label="Active Shipments"
            icon="truck"
            value={this.props.dashboard.shipments.filter(
              shipment => (shipment.status !== 'DELIVERED' && shipment.status !== 'NEW')).length}
          />
          <NumberCard
            label="Distribution Centers"
            icon="star"
            value={this.props.dashboard['distribution-centers'].length}
          />
          <NumberCard
            label="Retail Centers"
            icon="map-marker"
            value={this.props.dashboard.retailers.length}
          />
          <div className={classes.viewMode}>
            <div>
              <RaisedButton disabled={this.state.viewMode === 'map'} label="Map" onClick={this.setMapMode} />
              <RaisedButton disabled={this.state.viewMode === 'list'} label="List" onClick={this.setListMode} />
            </div>
          </div>
        </div>
        <AlertsCard />
        <div style={this.state.viewMode === 'map' ? visibleTab : invisibleTab} >
          <Map />
        </div>
        <div className={classes.shipmentsTable} style={this.state.viewMode === 'list' ? visibleTab : invisibleTab} >
          <ShipmentsTable />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  dashboard: React.PropTypes.object,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {})(Dashboard);
