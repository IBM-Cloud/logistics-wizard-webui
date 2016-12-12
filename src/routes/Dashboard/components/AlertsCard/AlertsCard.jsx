import React from 'react';
import { connect } from 'react-redux';
import classes from './AlertsCard.scss';

export const AlertsCard = ({ weather }) => (
  <div className={classes.wrapper}>
    <div className={classes.header}>Alerts Log</div>
    <div className={classes.content}>
      {weather.length > 0 ? `${weather.length} storm(s) detected!` : 'No Alerts Found' }
    </div>
  </div>
);

AlertsCard.propTypes = {
  weather: React.PropTypes.array,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  weather: state.dashboard.weather,
});

export default connect(mapStateToProps, {})(AlertsCard);
