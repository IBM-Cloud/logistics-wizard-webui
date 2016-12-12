import React from 'react';
import classes from './MapMarker.scss';

export default class MapMarker extends React.PureComponent {
  static propTypes = {
    type: React.PropTypes.oneOf(['distributionCenter', 'retailer', 'shipment', 'storm']).isRequired,
    data: React.PropTypes.object.isRequired,
    children: React.PropTypes.element,
    selectMarker: React.PropTypes.func.isRequired,
  }

  handleClick = () => this.props.selectMarker(this.props.type, this.props.data)

  render() {
    const { type, children } = this.props;

    let markerIcon;
    let customMarker;
    switch (type) {
      case 'retailer':
        markerIcon = 'fa fa-circle';
        break;
      case 'shipment':
        markerIcon = 'fa fa-truck';
        break;
      case 'storm':
        customMarker = (
          <div className={classes[type]}>
            <img className={classes.weatherIcon} role="presentation" src="../storm.png" />
            <div className={classes.weatherCircle} />
          </div>
      );
        break;
      default:
    }

    return (
      <div className={classes[type]} onClick={this.handleClick}>
        {markerIcon ? <i className={markerIcon} /> : ''}
        {customMarker || ''}
        <div className={classes.mapMarkerPopup}>
          {children}
        </div>
      </div>
    );
  }
}
