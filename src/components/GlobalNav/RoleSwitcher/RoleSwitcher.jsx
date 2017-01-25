import React from 'react';
import { connect } from 'react-redux';
import { endDemoSession } from 'modules/demos';
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
  <IconButton iconStyle={iconStyles}>
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
    <button className={classes.item} onClick={props.endDemoSession}>
      <div className={classes.iconContainer}>
        <i className={`${classes.icon} fa-sign-out fa`} />
      </div>
      <div className={classes.textContainer}>
        <div className={classes.label}>
          End Session
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
  endDemoSession: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  endDemoSession,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, mapActionCreators)(RoleSwitcher);
