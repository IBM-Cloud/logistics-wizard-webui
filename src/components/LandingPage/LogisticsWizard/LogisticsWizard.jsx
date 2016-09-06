import React from 'react';
import GhostButton from 'components/GhostButton';
import classes from './LogisticsWizard.scss';

// TODO: Replace inline styles with MuiTheme.
// TODO: Add ghost button theme to global css.
// TODO: Create custom raised button with inline style overrides for border.
// TODO: Accept props so we can still use Raised Button props as well. =)

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
      <p>Image Placeholder</p>
    </section>
  </div>
);

// Footer.propTypes = {
//   customProp: React.PropTypes.string,
//   clicky: React.PropTypes.func.isRequired,
// };

export default LogisticsWizard;
