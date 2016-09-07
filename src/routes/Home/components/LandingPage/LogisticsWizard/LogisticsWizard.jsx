import React from 'react';
import GhostButton from 'components/GhostButton';
import Mockup from '../assets/img/mockup.png';
import classes from './LogisticsWizard.scss';

export const LogisticsWizard = () => (
  <div className={classes.logisticsWizard}>
    <section>
      <h1>Logistics Wizard</h1>
      <p>
        A cognitive logistics solution that analyzes real-time data, provides
         intelligent recommendations, and presents your employees with a beautiful
         monitoring dashboard to help lead your supply chain management system into the future.
      </p>
      <GhostButton
        label="View Logistics Wizard in Action"
        className={classes.button}
        backgroundColor="#FFFFFF"
        labelColor="#0F94A7"
      />
    </section>

    <section>
      <img src={Mockup} role="presentation" />
    </section>
  </div>
);

export default LogisticsWizard;
