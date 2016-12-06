import React from 'react';
import Map from './Map';
import ShipmentsTable from './ShipmentsTable';
import DashboardTitle from './DashboardTitle';
import CompletionCard from './CompletionCard';
import ProgressCard from './ProgressCard';
import AlertsCard from './AlertsCard';
import classes from './Dashboard.scss';

export const Dashboard = () => (
  <div className={classes.wrapper}>
    <div className={classes.pageContainer}>
      <DashboardTitle />
      <div className={classes.cardSection}>
        <CompletionCard />
        <ProgressCard />
        <AlertsCard />
      </div>
      <Map />
      <ShipmentsTable />
    </div>
  </div>
);

export default Dashboard;
