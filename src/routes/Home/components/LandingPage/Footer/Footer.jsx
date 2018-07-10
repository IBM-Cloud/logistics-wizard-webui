import React from 'react';
import GhostButton from 'components/GhostButton';
import classes from './Footer.scss';

export const Footer = () => (
  <div className={classes.footer}>
    <div className={classes.gradient} />
    <h4>Learn more on the Logistics Wizard repository</h4>
    <a href="https://github.com/IBM-Cloud/logistics-wizard">
      <GhostButton label="Github" />
    </a>
  </div>
);

export default Footer;
