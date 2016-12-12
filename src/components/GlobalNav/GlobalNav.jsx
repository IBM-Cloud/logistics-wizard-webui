import React from 'react';
import IconButton from 'material-ui/IconButton';
import { Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator } from 'material-ui/Toolbar';
import { Icon } from 'react-fa';
import { Link } from 'react-router';
import RoleSwitcher from 'containers/RoleSwitcherContainer';
import classes from './GlobalNav.scss';

const styles = {
  separator: {
    margin: '0px 0.75rem 0px 1rem',
  },
};

export const GlobalNav = () => (
  <div className={classes.globalNav}>
    <Toolbar>
      <ToolbarGroup firstChild>
        <Link to="/">
          <ToolbarTitle text="Logistics Wizard" className={classes.title} />
        </Link>
      </ToolbarGroup>

      <ToolbarGroup>
        <RoleSwitcher />
        <ToolbarSeparator style={styles.separator} />
        <a href="https://github.com/IBM-Bluemix/logistics-wizard" target="_blank">
          <IconButton >
            <Icon
              name="github"
              className={classes.github}
            />
          </IconButton>
        </a>
      </ToolbarGroup>
    </Toolbar>
  </div>
);

GlobalNav.propTypes = {
};

export default GlobalNav;
