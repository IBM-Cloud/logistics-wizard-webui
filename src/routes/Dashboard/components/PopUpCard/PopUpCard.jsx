import React from 'react';
import classes from './PopUpCard.scss';

const PopUpCard = ({ id, type, children }) => (
  <div className={classes.wrapper}>
    <div className={`${classes.title} ${classes[type]}`}>
      <h4>Distribution Center {id}</h4>
      <i className={`fa fa-times-circle-o ${classes.closeIcon}`} />
    </div>
    <div>
      {children}
    </div>
  </div>
);

export default PopUpCard;
