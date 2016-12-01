import React from 'react';
import classes from '../PopUpCard.scss';

const RetailerCard = ({ managerId, address }) => (
  <div className={classes.mainSection}>
    <div>
      MANAGER {managerId}
    </div>
    <div>
      ADDRESS {address.city},
      &nbsp;{address.state}
    </div>
  </div>
);

RetailerCard.propTypes = {
  managerId: React.PropTypes.string.isRequired,
  address: React.PropTypes.shape({
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default RetailerCard;
