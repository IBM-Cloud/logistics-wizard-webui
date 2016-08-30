import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import classNames from 'classnames';
import classes from './GhostButton.scss';

export const GhostButton = (props) => (
  <div>
    <RaisedButton
      label={props.label}
      backgroundColor={'#2b333d'}
      labelColor={'#FFFFFF'}
      className={classNames({
        [classes.ghostButton]: true,
        [props.className]: true,
      })}
    />
  </div>
);

GhostButton.propTypes = {
  backgroundColor: React.PropTypes.string,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  disabledBackgroundColor: React.PropTypes.string,
  disabledLabelColor: React.PropTypes.string,
  fullWidth: React.PropTypes.bool,
  href: React.PropTypes.string,
  icon: React.PropTypes.node,
  label: React.PropTypes.string,
  labelColor: React.PropTypes.string,
  labelPosition: React.PropTypes.string,
  labelStyle: React.PropTypes.object,
  primary: React.PropTypes.bool,
  rippleStyle: React.PropTypes.object,
  secondary: React.PropTypes.bool,
  style: React.PropTypes.object,
};

export default GhostButton;
