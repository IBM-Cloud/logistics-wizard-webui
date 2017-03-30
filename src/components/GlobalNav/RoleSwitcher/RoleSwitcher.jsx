import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AccountUser from 'material-ui/svg-icons/action/account-circle';
import { palette } from 'styles/muiTheme';
import LoadingSpinner from 'components/LoadingSpinner';
import RoleItem from './RoleItem';
import classes from './RoleItem.scss';


const iconStyles = {
  width: '1.7rem',
  height: '1.7rem',
};

const AccountButton = () => (
  <IconButton id="accountMenu" iconStyle={iconStyles}>
    <AccountUser
      color={palette.primary3Color}
      hoverColor={palette.alternateTextColor}
    />
  </IconButton>
);

export const RoleSwitcher = (props) => (
  props.users
  ? <IconMenu
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    iconButtonElement={AccountButton()}
  >
    {props.users.map((user, key) => (
      <RoleItem
        key={key}
        user={user}
        roleAction={props.login}
      />
    ))}
    <button id="endSession" className={classes.item} onClick={props.logout}>
      <div className={classes.flexContainer}>
        <div className={classes.iconContainer}>
          <i className={`${classes.icon} fa-sign-out fa`} />
        </div>
        <div className={classes.textContainer}>
          <div className={classes.label}>
            End Session
          </div>
        </div>
      </div>
    </button>
    {/*  keep new user creation disabled until it becomes useful */}
    {/* <RoleItem roleAction={createUser} /> */}
  </IconMenu>
  : <div><LoadingSpinner color={palette.primary3Color} /></div>
);

RoleSwitcher.propTypes = {
  users: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    role: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
  }).isRequired),
  login: React.PropTypes.func.isRequired,
  createUser: React.PropTypes.func.isRequired,
  logout: React.PropTypes.func.isRequired,
};

export default RoleSwitcher;
