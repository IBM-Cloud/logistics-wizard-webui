import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import GlobalButton from 'components/GlobalButton';
import classes from './Footer.scss';

// TODO: Replace inline styles with MuiTheme.
// TODO: Add ghost button theme to global css.
// TODO: Create custom raised button with inline style overrides for border.
// TODO: Accept props so we can still use Raised Button props as well. =)

export const Footer = () => (
  <div className={classes.footer}>
    <div className={classes.gradient} />
    <h4>Learn more on the Logistics Wizard Wiki</h4>
    <GlobalButton label="Github Wiki" className={classes.button} />
  </div>
);

// Footer.propTypes = {
//   customProp: React.PropTypes.string,
//   clicky: React.PropTypes.func.isRequired,
// };

export default Footer;
