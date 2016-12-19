import React from 'react';
import { connect } from 'react-redux';
import classes from './AlertsCard.scss';

export const AlertsCard = ({ weather }) => (
  <div className={weather.length > 0 ? classes.wrapper : classes.hidden}>
    <div className={classes.content}>
      <div>{weather.length} storm(s) detected!</div>
      <i className={`fa fa-times-circle-o ${classes.closeIcon}`} />
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
