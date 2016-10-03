import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from '../PopUpCard.scss';

const styles = {
  paper: {
    width: '120',
  },
};
/*
{
      "contact": {
        "name": "Joseph Smith"
      },
      "id": 1,
      "address": {
        "state": "Utah",
        "city": "Salt Lake City",
        "country": "US",
        "latitude": 40.71,
        "longitude": -111.9
      }
    }
*/
const DCCard = (props) => {
  let address;
  let contact;
  if (props.dc) {
    const dc = props.dc;
    if (dc.contact && dc.contact.name) {
      contact = (
        <div><h6>CONTACT</h6> {dc.contact.name}</div>
      );
    }
    if (dc.address) {
      address = (
        <div><h6>ADDRESS</h6> {dc.address.city},
          &nbsp;{dc.address.state}</div>
      );
    }
  }
  const title = props.dc
    ? `DC ${props.dc.id}`
    : '...';
  return (
    <Paper zDepth={2} style={styles.paper}>
      <div className={classes.mainSection}>
        <h4>{title}</h4>
        <hr />
        { contact }
        { address }
      </div>
    </Paper>
  );
};

DCCard.propTypes = {
  dc: React.PropTypes.object.isRequired,
};

export default DCCard;
