import React from 'react';
import classes from './NumberCard.scss';

export const NumberCard = (props) => (
  <div className={classes.card}>
    <div className={classes.value}>{props.value}</div>
    <div className={classes.label}>
      <i className={`fa fa-${props.icon}`} />
      {props.label}
    </div>
  </div>
);

NumberCard.propTypes = {
  icon: React.PropTypes.string,
  label: React.PropTypes.string,
  value: React.PropTypes.number,
};

export default NumberCard;
