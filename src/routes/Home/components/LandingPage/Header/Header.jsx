import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { Link } from 'react-router';
import GhostButton from 'components/GhostButton';
import Background from '../assets/img/background.png';
import classes from './Header.scss';

const styles = {
  header: {
    background: `url(${Background}) no-repeat center center`,
    backgroundSize: 'cover',
  },
  toolbar: {
    background: 'transparent',
  },
  title: {
    fontSize: '0.8rem',
  },
};

export const Header = () => (
  <div style={styles.header} className={classes.header}>
    <Toolbar style={styles.toolbar}>
      <ToolbarTitle text="Logistics Wizard" style={styles.title} className={classes.title} />
      <div className={classes.topLink}>
        <a href="https://github.com/IBM-Bluemix/logistics-wizard" target="_blank">
          <p className={classes.text}>Github Source Code</p>
        </a>
      </div>
    </Toolbar>

    <h1>Let your global supply chain do the THINKing,<br /> so you don't have to.</h1>
    <Link to="/create-demo">
      <GhostButton
        label="View Logistics Wizard in Action"
        className={classes.button}
        backgroundColor="#FFFFFF"
        labelColor="#0F94A7"
      />
    </Link>
  </div>
);

export default Header;
