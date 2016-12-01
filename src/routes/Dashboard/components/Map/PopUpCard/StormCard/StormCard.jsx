import React from 'react';
import classes from '../PopUpCard.scss';

const StormCard = ({ storm }) => {
  const {
    event,
    recommendations,
  } = storm;

  return (
    <div className={classes.contentContainer}>
      <div className={classes.subtitle}>
        Type
      </div>
      <div>{event.event_desc}</div>

      <div className={classes.subtitle}>
        Severity
      </div>
      <div>{event.severity}</div>

      <div className={classes.subtitle}>
        Recommendations
      </div>
      <div>{recommendations.length || '0'}</div>
    </div>
  );
};

StormCard.propTypes = {
  storm: React.PropTypes.object.isRequired,
};

export default StormCard;
