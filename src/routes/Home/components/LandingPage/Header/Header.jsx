import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import GhostButton from 'components/GhostButton';
import { connect } from 'react-redux';
import { createDemo } from 'modules/demos';
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

export class Header extends React.PureComponent {
  static propTypes = {
    createDemo: React.PropTypes.func.isRequired,
  }

  createDemo = () => {
    this.props.createDemo(window.localStorage.getItem('savedGuid'));
  }

  render() {
    return (
      <div style={styles.header} className={classes.header}>
        <Toolbar style={styles.toolbar}>
          <ToolbarTitle text="Logistics Wizard" style={styles.title} className={classes.title} />
          <div className={classes.topLink}>
            <a href="https://github.com/IBM-Bluemix/logistics-wizard" rel="noopener noreferrer" target="_blank">
              <p className={classes.text}>Github Source Code</p>
            </a>
          </div>
        </Toolbar>

        <h1>Let your global supply chain do the THINKing,<br /> so you don't have to.</h1>
        <br />
        <GhostButton
          label="View Logistics Wizard in Action"
          primary={false}
          onTouchTap={this.createDemo}
        />
      </div>
    );
  }
}

export default connect(() => ({}), { createDemo })(Header);
