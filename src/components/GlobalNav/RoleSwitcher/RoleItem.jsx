import React from 'react';
import classNames from 'classnames';
import classes from './RoleItem.scss';

export class RoleItem extends React.PureComponent {
  iconContainer = (user) => (
    <div className={classes.iconContainer}>
      <i
        className={classNames({
          [classes.icon]: true,
          'fa-user': user,
          'fa-plus': !user,
          [classes.small]: !user,
          fa: true,
        })}
      />
    </div>
  )

  textContainer = (user) => (
    <div className={classes.textContainer}>
      <div
        className={classNames({
          [classes.label]: true,
          [classes.light]: !user,
        })}
      >
        {user ? user.role : 'Create New Retail Manager' }
      </div>
      {user && user.location
        ? <div className={classes.sublabel}>{user.location}</div>
        : ''
      }
    </div>
  )

  handleClick = () => {
    const { user, roleAction } = this.props;

    if (user && !user.loggedIn) {
      roleAction(user.id);
    }
    else {
      roleAction();
    }
  }

  render() {
    const user = this.props.user;

    return (
      <button
        onTouchTap={this.handleClick}
        className={classNames({
          [classes.item]: true,
          [classes.selected]: (user ? user.loggedIn : false),
        })}
      >
        <div className={classes.flexContainer}>
          {this.iconContainer(user)}
          {this.textContainer(user)}
        </div>

      </button>
    );
  }
}

RoleItem.propTypes = {
  user: React.PropTypes.shape({
    id: React.PropTypes.number.isRequired,
    role: React.PropTypes.string.isRequired,
    location: React.PropTypes.string,
    loggedIn: React.PropTypes.bool,
  }),
  roleAction: React.PropTypes.func.isRequired,
};

export default RoleItem;
