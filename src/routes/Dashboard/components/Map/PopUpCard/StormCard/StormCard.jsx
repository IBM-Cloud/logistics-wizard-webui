import React from 'react';
import classes from '../PopUpCard.scss';

const StormCard = ({ storm }) => {
  const {
    event,
    recommendations,
  } = storm;


  return (
    <div className={classes.contentContainer}>
      <div className={classes.iconTitleContainer}>
        <div className={classes.subtitle}>
          <img className={classes.weatherIcon} role="presentation" src="../storm.png" />
        </div>
        <div>
          <div>
            <h2>{event.event_desc}</h2>
          </div>

          <span className={classes.subtitle}>
        Severity:&nbsp;
      </span>
          {event.severity}
        </div>
      </div>


      <div className={classes.subtitle}>
        Suggested Shipments
      </div>
      <div>
        <small>
          Potential supply shortages due to weather.
          Consider sending additional supplies to affected locations.
        </small>
        {recommendations.map(recommendation =>
          <div className={classes.shipmentDialog}>
            <div className={classes.shipmentTitle}>
              Shipment from {recommendation.fromId} to {recommendation.toId}
            </div>
            <div className={classes.shipmentDialogActionContainer}>
              <div className={classes.shipmentDialogAction}>
                Reject
              </div>
              <div className={classes.shipmentDialogAction}>
                Approve
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StormCard.propTypes = {
  storm: React.PropTypes.object.isRequired,
};

export default StormCard;
