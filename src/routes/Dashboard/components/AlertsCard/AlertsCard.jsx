import React from 'react';
import classes from './AlertsCard.scss';

export const AlertsCard = (props) => (
  <div className={classes.wrapper}>
    <div className={classes.header}>Alerts Log</div>
    <div className={classes.content}>
      {props.storms.length > 0 ? `${props.storms.length} storm(s) detected!` : 'No Alerts Found' }
    </div>
  </div>
);

AlertsCard.propTypes = {
  storms: React.PropTypes.array,
};

AlertsCard.defaultProps = {
  storms: [],
};

export default AlertsCard;
