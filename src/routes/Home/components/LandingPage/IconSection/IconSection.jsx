import React from 'react';
import Hybrid from '../assets/img/hybrid.svg';
import Cognitive from '../assets/img/cognitive.svg';
import HandsOff from '../assets/img/handsOff.svg';
import classes from './IconSection.scss';

export const IconSection = () => (
  <div className={classes.iconSection}>
    <div className={classes.iconContainer}>
      <img src={Hybrid} alt="Hybrid Icon" className={classes.icon} />
      <h4>Hybrid</h4>
      <p>Connect to your existing on-premises ERP system and give your data a makeover.</p>
    </div>

    <div className={classes.iconContainer}>
      <img src={Cognitive} alt="Cognitive Icon" className={classes.icon} />
      <h4>Cognitive</h4>
      <p>
        Ingesting data sources like weather and social media in real-time
         enables your supply chain managers with instantaneous resource planning from Watson.
      </p>
    </div>

    <div className={classes.iconContainer}>
      <img src={HandsOff} alt="Hands Off Icon" className={classes.icon} />
      <h4>Hands-Off</h4>
      <p>
        Monitoring, alerts, automatic updates, and more come standard with Cloud Foundry
         on IBM Bluemix and the IBM Open Toolchain.
      </p>
    </div>
  </div>
);

export default IconSection;
