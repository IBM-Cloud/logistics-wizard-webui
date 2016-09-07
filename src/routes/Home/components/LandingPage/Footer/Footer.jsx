import React from 'react';
import GhostButton from 'components/GhostButton';
import classes from './Footer.scss';

export const Footer = () => (
  <div className={classes.footer}>
    <div className={classes.gradient} />
    <h4>Learn more on the Logistics Wizard Wiki</h4>
    <GhostButton label="Github Wiki" className={classes.button} />
  </div>
);

export default Footer;
