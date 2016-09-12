import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from './PopUpCard.scss';

const PopUpCard = (props) => {
  let currentLocation;
  let estimatedTimeOfArrival;
  let updatedAt;
  if (props.shipment) {
    const shipment = props.shipment;
    if (shipment.currentLocation) {
      currentLocation = (
        <div><h6>CURRENT LOCATION</h6> {shipment.currentLocation.city},
          {shipment.currentLocation.state}</div>
      );
    }
    if (shipment.estimatedTimeOfArrival) {
      estimatedTimeOfArrival = (
        <div><h6>ESTIMATED TOA</h6> {shipment.estimatedTimeOfArrival}</div>
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
    <Paper zDepth={2}>
      <Toolbar>
        <ToolbarTitle text={title} />
      </Toolbar>
      <div className={classes.mainSection}>
        <div className={classes.col1}>
          <h6>ORDER</h6>
            { props.shipment ? props.shipment.id : '...'}{"\n"}
        </div>
        <div className={classes.col2}>
          <h6>STATUS</h6>
          { props.shipment ? props.shipment.status : 'loading...'}{"\n"}
        </div>
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
