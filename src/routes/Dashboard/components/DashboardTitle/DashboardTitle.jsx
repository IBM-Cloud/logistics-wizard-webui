import React from 'react';
import classes from './DashboardTitle.scss';

export const DashboardTitle = ({ isRetail }) => (
  <div className={classes.title}>
    {isRetail ? 'Retail Manager Overview' : 'Supply Chain Overview'}
  </div>
);

DashboardTitle.propTypes = {
  isRetail: React.PropTypes.bool,
};

DashboardTitle.defaultPropTypes = {
  isRetail: false,
};

export default DashboardTitle;
