import React from 'react';
import { Icon } from 'react-fa';

// Material UI
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

// Images
import Background from '../assets/img/background.png';
// import WorldMap from '../assets/img/map.svg';
// import Circle01 from '../assets/img/Circles_1.svg';
// import Circle02 from '../assets/img/Circles_2.svg';
// import Circle03 from '../assets/img/Circles_3.svg';
// import Circle04 from '../assets/img/Circles_4.svg';
// import Circle05 from '../assets/img/Circles_5.svg';
// import Circle06 from '../assets/img/Circles_6.svg';
// import Circle07 from '../assets/img/Circles_7.svg';
// import Circle08 from '../assets/img/Circles_8.svg';
// import Circle09 from '../assets/img/Circles_9.svg';
// import Circle10 from '../assets/img/Circles_10.svg';

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

      {/* <div className={classes.dots}>
        <img src={Circle01} role="presentation" className={classes.circle01} />
        <img src={Circle02} role="presentation" className={classes.circle02} />
        <img src={Circle03} role="presentation" className={classes.circle03} />
        <img src={Circle04} role="presentation" className={classes.circle04} />
        <img src={Circle05} role="presentation" className={classes.circle05} />
        <img src={Circle06} role="presentation" className={classes.circle06} />
        <img src={Circle07} role="presentation" className={classes.circle07} />
        <img src={Circle08} role="presentation" className={classes.circle08} />
        <img src={Circle09} role="presentation" className={classes.circle09} />
        <img src={Circle10} role="presentation" className={classes.circle10} />
      </div> */}
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

// Footer.propTypes = {
//   customProp: React.PropTypes.string,
//   clicky: React.PropTypes.func.isRequired,
// };

export default Header;
