import React from 'react';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

// Material UI
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

// Images
import Background from '../assets/img/background.png';

import classes from './Header.scss';

export const Header = () => (
  <div className={classes.header}>
    <div className={classes.background}>
      <img src={Background} role="presentation" className={classes.map} />
    </div>

    <Toolbar className={classes.toolbar}>
      <ToolbarTitle text="Logistics Wizard" className={classes.title} />
      <div className={classes.topLink}>
        <a href="https://github.com/IBM-Bluemix/logistics-wizard">
          <p className={classes.text}>Github Source Code</p>
        </a>
      </div>
    </Toolbar>

    <h1>Let your global supply chain do the THINKing,<br /> so you don't have to.</h1>
    <Link to="/create-demo">
        <RaisedButton
        primary
        className={classes.button}
        label="Start the Logistics Wizard Demo"
      />
  </Link>
  </div>
);

export default Header;
