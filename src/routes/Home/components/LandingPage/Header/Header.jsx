import React from 'react';
import { Icon } from 'react-fa';

// Material UI
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

// Images
import Background from '../assets/img/background.png';

import classes from './Header.scss';

const styles = {
  toolbar: {
    background: 'transparent',
  },
  title: {
    fontSize: '0.8rem',
  },
};

export const Header = () => (
  <div className={classes.header}>


    <div className={classes.background}>
      <img src={Background} role="presentation" className={classes.map} />
    </div>

    <Toolbar style={styles.toolbar}>
      <ToolbarTitle text="Logistics Wizard" style={styles.title} className={classes.title} />
      <div className={classes.topLink}>
        <p className={classes.text}>Github Source Code</p>
      </div>
    </Toolbar>

    <h1>Let your global supply chain do the THINKing,<br /> so you don't have to.</h1>
  </div>
);

export default Header;
