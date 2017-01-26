import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import RetailSummaryCard from './RetailSummaryCard';
import DCSummaryCard from './DCSummaryCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';

const visibleTab = {
  display: 'flex',
  flexGrow: 1,
};

const invisibleTab = {
  display: 'flex',
  flexGrow: 0,
  height: 0,
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
          <CompletionCard />
          <ProgressCard />
          <DCSummaryCard />
          <RetailSummaryCard />
        </div>
        <AlertsCard />
        <div className={classes.viewMode}>
          <span style={{ flexGrow: 1 }} />
          <RaisedButton disabled={this.state.viewMode === 'map'} label="Map" onClick={this.setMapMode} />
          <RaisedButton disabled={this.state.viewMode === 'list'} label="List" onClick={this.setListMode} />
        </div>
        <div style={this.state.viewMode === 'map' ? visibleTab : invisibleTab} >
          <Map />
        </div>
        <div style={this.state.viewMode === 'list' ? visibleTab : invisibleTab} >
          <ShipmentsTable />
        </div>
      </div>
    );
  }
}

export default Dashboard;
