import React from 'react';
import { connect } from 'react-redux';
import { endDemoSession } from 'modules/demos';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import RoleSwitcher from 'containers/RoleSwitcherContainer';
import classes from './GlobalNav.scss';

const styles = {
  separator: {
    margin: '0px 0.75rem 0px 1rem',
  },
  toolbarTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
  },
  toolbar: {
    height: '56px',
  },
  iconButton: {
    top: '-1.5px',
  },
};

export const GlobalNav = (props) => (
  <div className={classes.globalNav}>
    <Toolbar style={styles.toolbar}>
      <ToolbarGroup firstChild>
        <Link to="/">
          <ToolbarTitle text="Logistics Wizard" className={classes.title} style={styles.toolbarTitle} />
        </Link>
      </ToolbarGroup>

      <ToolbarGroup>
        <RoleSwitcher logout={props.endDemoSession} />
        <IconButton style={styles.iconButton}>
          <a href="https://github.com/IBM-Bluemix/logistics-wizard" target="_blank">
            <Icon
              name="github"
              className={classes.github}
            />
          </a>
        </IconButton>

      </ToolbarGroup>
    </Toolbar>
  </div>
);

GlobalNav.propTypes = {
  endDemoSession: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  endDemoSession,
};

const mapStateToProps = () => ({
});

// export default GlobalNav;
export default connect(mapStateToProps, mapActionCreators)(GlobalNav);
