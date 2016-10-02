import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadingSpinner = (props) => (
  <CircularProgress
    style={props.style || {marginLeft: '50%'}}
    color={props.color}
    size={props.size || .5}
  />
);

LoadingSpinner.propTypes = {
  size: React.PropTypes.number,
  style: React.PropTypes.object,
  color: React.PropTypes.string,
};

export default LoadingSpinner;
