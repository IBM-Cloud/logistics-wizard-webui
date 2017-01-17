import React from 'react';
import { connect } from 'react-redux';
import classes from './AlertsCard.scss';

export const AlertsCard = ({ storms }) => (
  <div className={storms.length > 0 ? classes.wrapper : classes.hidden}>
    <div className={classes.content}>
      <div>{storms.length} storm(s) detected!</div>
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
  storms: state.dashboard.storms,
});

export default connect(mapStateToProps, {})(AlertsCard);
