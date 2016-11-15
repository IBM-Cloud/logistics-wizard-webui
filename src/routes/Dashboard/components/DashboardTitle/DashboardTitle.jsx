import React from 'react';
import classes from './DashboardTitle.scss';

export const DashboardTitle = ({ isRetail }) => (
  <h4>{isRetail ? 'Retail Manager Overview' : 'Supply Chain Overview'}</h4>
);

DashboardTitle.propTypes = {
  isRetail: React.PropTypes.bool,
};

DashboardTitle.defaultPropTypes = {
  isRetail: false,
};

export default DashboardTitle;
