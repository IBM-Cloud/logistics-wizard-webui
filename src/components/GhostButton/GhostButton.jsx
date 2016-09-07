import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { palette } from 'styles/muiTheme';
import classes from './GhostButton.scss';

export const GhostButton = (props) => (
  <RaisedButton
    {...props}
    backgroundColor={props.backgroundColor || '#2b333d'}
    labelColor={props.labelColor || palette.alternateTextColor}
    className={`${classes.ghostButton} ${props.className}`}
  />
);

GhostButton.propTypes = {
  backgroundColor: React.PropTypes.string,
  className: React.PropTypes.string,
  labelColor: React.PropTypes.string,
};

export default GhostButton;
