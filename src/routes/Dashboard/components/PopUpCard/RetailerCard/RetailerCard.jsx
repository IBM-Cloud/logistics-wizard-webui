import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from '../PopUpCard.scss';

const styles = {
  paper: {
    width: '160',
  },
};
/*
{
      "id": 1261,
      "managerId": null,
      "address": {
        "state": "North Carolina",
        "city": "Raleigh",
        "country": "US",
        "latitude": 35.71,
        "longitude": -78.63
      }
    }
*/
const RetailerCard = (props) => {
  let address;
  let managerId;
  if (props.retailer) {
    const retailer = props.retailer;
    if (retailer.managerId) {
      managerId = (
        <div><h6>MANAGER</h6> {retailer.managerId}</div>
      );
    }
    if (retailer.address) {
      address = (
        <div><h6>ADDRESS</h6> {retailer.address.city},
          &nbsp;{retailer.address.state}</div>
      );
    }
  }
  const title = props.retailer
    ? `Retailer ${props.retailer.id}`
    : '...';
  return (
    <Paper zDepth={2} style={styles.paper}>
      <div className={classes.mainSection}>
        <h4>{title}</h4>
        <hr />
        { managerId }
        { address }
      </div>
    </Paper>
  );
};

RetailerCard.propTypes = {
  retailer: React.PropTypes.object.isRequired,
};

export default RetailerCard;
