import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { palette } from 'styles/muiTheme';

const LoadingSpinner = (props) => (
  <CircularProgress
    style={props.style || {}}
    color={props.color || palette.primary3Color}
    size={props.size || 32}
  />
);

LoadingSpinner.propTypes = {
  size: React.PropTypes.number,
  style: React.PropTypes.object,
  color: React.PropTypes.string,
};

export default LoadingSpinner;
