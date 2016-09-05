import React from 'react';
import classNames from 'classnames';
import classes from './RoleItem.scss';

export class RoleItem extends React.PureComponent {
  render() {
    return (
      <button
        className={classNames({
          [classes.item]: true,
          [classes.selected]: this.props.selected,
        })}
      >
        <div className={classes.iconContainer}>
          <i
            className={classNames({
              [classes.icon]: true,
              [this.props.iconType]: true,
              [classes.small]: this.props.light,
              fa: true,
            })}
          />
        </div>

        <div className={classes.textContainer}>
          <div
            className={classNames({
              [classes.label]: true,
              [classes.center]: !this.props.location,
              [classes.light]: this.props.light,
            })}
          >
            {this.props.label}
          </div>
          {this.props.location
            ? <div className={classes.sublabel}>{this.props.location}</div>
            : ''
          }
        </div>
      </button>
    );
  }
}

RoleItem.propTypes = {
  selected: React.PropTypes.bool,
  light: React.PropTypes.bool,
  location: React.PropTypes.string,
  iconType: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
};

export default RoleItem;
