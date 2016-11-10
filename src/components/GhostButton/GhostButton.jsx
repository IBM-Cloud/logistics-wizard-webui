import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { palette } from 'styles/muiTheme';

const border = {
  primary: {
    border: `1px solid ${palette.alternateTextColor}`,
  },
  secondary: {
    border: `1px solid ${palette.primary1Color}`,
  },
};

export const GhostButton = props => (
  <RaisedButton
    {...props}
    backgroundColor={props.primary ? palette.primary2Color : '#FFF'}
    labelColor={props.primary ? palette.alternateTextColor : palette.primary1Color}
    style={props.primary ? border.primary : border.secondary}
  />
);

GhostButton.propTypes = {
  primary: React.PropTypes.bool,
  className: React.PropTypes.string,
};

GhostButton.defaultProps = {
  primary: true,
};

export default GhostButton;
