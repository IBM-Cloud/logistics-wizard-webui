import React from 'react';
import classes from './AlertsCard.scss';

export const AlertsCard = (props) => (
  <div className={classes.wrapper}>
    <div className={classes.header}>Alerts Log</div>
    <div className={classes.content}>
      <div className={classes.noAlert}>No Alerts Found</div>
    </div>
  </div>
);

AlertsCard.propTypes = {
};

export default AlertsCard;
