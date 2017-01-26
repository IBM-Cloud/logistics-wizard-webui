import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
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

/**
 * Use our own tab template to hide the map using flexGrow = 0,
 * and not only the height. Failure to do so would break the map display
 * as the GoogleMap component needs a real height at some point.
 */
const styles = {
  width: '100%',
  position: 'relative',
  textAlign: 'initial',
};

// const visibleTab = {
//   display: 'flex',
//   flexGrow: 1,
// };
//
// const invisibleTab = {
//   display: 'flex',
//   flexGrow: 0,
//   height: 0,
//   overflow: 'hidden',
// };

const TabTemplate = ({ children, selected, style }) => {
  const templateStyle = Object.assign({}, styles, style);
  if (!selected) {
    templateStyle.flexGrow = 0;
    templateStyle.height = 0;
    templateStyle.overflow = 'hidden';
  }
  return (
    <div className={classes.tabContainer} style={templateStyle}>
      {children}
    </div>
  );
};
TabTemplate.propTypes = {
  children: React.PropTypes.node,
  selected: React.PropTypes.bool,
  style: React.PropTypes.object,
};

class Dashboard extends React.PureComponent {

  constructor(props) {
    super(props);
    this.setMapMode = this.setMapMode.bind(this);
    this.setTableMode = this.setTableMode.bind(this);
  }

  componentWillMount() {
    this.setState({ viewMode: 'map' });
  }

  setMapMode() {
    this.setState({ viewMode: 'map' });
  }

  setTableMode() {
    this.setState({ viewMode: 'table' });
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
          <RaisedButton label="Map" onClick={this.setMapMode} />
          <RaisedButton label="Table" onClick={this.setTableMode} />
        </div>
        {/* <div style={this.state.viewMode === 'map' ? visibleTab : invisibleTab} >
          <Map />
        </div>
        <div style={this.state.viewMode === 'table' ? visibleTab : invisibleTab} >
          <ShipmentsTable />
        </div> */}

        <Tabs
          className={classes.tabs}
          tabItemContainerStyle={{ display: 'none' }}
          contentContainerClassName={classes.tab}
          inkBarStyle={{ display: 'none' }}
          value={this.state.viewMode}
          tabTemplate={TabTemplate}
        >
          <Tab label="Map" value="map">
            <Map />
          </Tab>
          <Tab label="Table" value="table">
            <ShipmentsTable />
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
