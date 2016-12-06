import React from 'react';
import moment from 'moment';
import classes from '../PopUpCard.scss';

const timeFormat = 'MMM Do, h:mm a';

const formatTime = time => moment(time).format(timeFormat);

const ShipmentCard = (props) => {
  const {
    status,
    currentLocation,
    estimatedTimeOfArrival,
    updatedAt,
  } = props.shipment;

  return (
    <div className={classes.contentContainer}>
      <div className={classes.subtitle}>
        Status
      </div>
      <div>{status}</div>

      <div className={classes.subtitle}>
        Current Location
      </div>
      <div>{`
        ${currentLocation.city},
        ${currentLocation.state}
      `}</div>

      <div className={classes.subtitle}>
        Estimated Time of Arrival
      </div>
      <div>{formatTime(estimatedTimeOfArrival)}</div>

      <div className={classes.subtitle}>
        Last Updated
      </div>
      <div>{updatedAt ? formatTime(updatedAt) : 'N/A'}</div>
    </div>
  );
};

ShipmentCard.propTypes = {
  shipment: React.PropTypes.object.isRequired,
};

export default ShipmentCard;
