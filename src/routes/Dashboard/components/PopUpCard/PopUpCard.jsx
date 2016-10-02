import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from './PopUpCard.scss';

const styles = {
  paper: {
    width: '160',
  },
};

const PopUpCard = (props) => {
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
          {shipment.currentLocation.state}</div>
      );
    }
    if (shipment.estimatedTimeOfArrival) {
      estimatedTimeOfArrival = (
        <div><h6>ESTIMATED TOA</h6>{shipment.estimatedTimeOfArrival}</div>
      );
    }
    if (shipment.updatedAt) {
      updatedAt = (
        <div><h6>LAST UPDATED</h6> {shipment.updatedAt}</div>
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

PopUpCard.propTypes = {
  shipment: React.PropTypes.object.isRequired,
};

export default PopUpCard;
