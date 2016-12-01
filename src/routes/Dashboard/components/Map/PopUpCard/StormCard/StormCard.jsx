import React from 'react';
import classes from '../PopUpCard.scss';

const StormCard = (props) => {
  let eventDesc;
  let severity;
  let shipmentRecommendations;
  if (props.storm) {
    const event = props.storm.event;
    const recommendations = props.storm.recommendations;
    if (event.event_desc) {
      eventDesc = (
        <div><h6>TYPE</h6> {event.event_desc}</div>
      );
    }

    if (event.severity) {
      severity = (
        <div><h6>Severity</h6> {event.severity}</div>
      );
    }

    if (recommendations) {
      shipmentRecommendations = (
        <div>{recommendations.length} Recommendations</div>
      );
    }
  }
  return (
    <div className={classes.mainSection}>
      { eventDesc }
      { severity }
      { shipmentRecommendations }
    </div>
  );
};

StormCard.propTypes = {
  storm: React.PropTypes.object.isRequired,
};

export default StormCard;
