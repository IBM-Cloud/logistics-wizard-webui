import React from 'react';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import RetailSummaryCard from './RetailSummaryCard';
import DCSummaryCard from './DCSummaryCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';

export const Dashboard = () => (
  <div className={classes.wrapper}>
    <div className={classes.cardSection}>
      <CompletionCard />
      <ProgressCard />
      <DCSummaryCard />
      <RetailSummaryCard />
    </div>
    <AlertsCard />
    {/* <ShipmentsTable /> */}
    <Map />
  </div>
);

export default Dashboard;
