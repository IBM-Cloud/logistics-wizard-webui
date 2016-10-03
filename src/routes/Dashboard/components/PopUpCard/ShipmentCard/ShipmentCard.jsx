import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from '../PopUpCard.scss';

const moment = require('moment');
const timeFormat = 'MMM Do, h:mm a';

const styles = {
  paper: {
    width: '140',
  },
};

const ShipmentCard = (props) => {
  let currentLocation;
  let estimatedTimeOfArrival;
  let updatedAt;
  let status;
  if (props.shipment) {
    const shipment = props.shipment;
    if (shipment.status) {
      status = (
        <div><h6>STATUS</h6> {shipment.status}</div>
      );
    }
    if (shipment.currentLocation) {
      currentLocation = (
        <div><h6>CURRENT LOCATION</h6> {shipment.currentLocation.city},
          &nbsp;{shipment.currentLocation.state}</div>
      );
    }
    if (shipment.estimatedTimeOfArrival) {
      const formattedTime = moment(shipment.estimatedTimeOfArrival).format(timeFormat)
      estimatedTimeOfArrival = (
        <div><h6>ESTIMATED TOA</h6>{formattedTime}</div>
      );
    }
    if (shipment.updatedAt) {
      const formattedTime = moment(shipment.updatedAt).format(timeFormat)
      updatedAt = (
        <div><h6>LAST UPDATED</h6> {formattedTime}</div>
      );
    }
  }
  const title = props.shipment
    ? `Shipment ${props.shipment.id}`
    : '...';
  return (
    <Paper zDepth={2} style={styles.paper}>
      <div className={classes.mainSection}>
        <h4>{title}</h4>
        <hr />
        { status }
        { currentLocation }
        { estimatedTimeOfArrival }
        { updatedAt }
      </div>
    </Paper>
  );
};

ShipmentCard.propTypes = {
  shipment: React.PropTypes.object.isRequired,
};

export default ShipmentCard;
