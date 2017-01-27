import React from 'react';
import classNames from 'classnames';
import classes from './MapMarker.scss';

export default class MapMarker extends React.PureComponent {
  static propTypes = {
    type: React.PropTypes.oneOf(['distributionCenter', 'retailer', 'shipment', 'storm']).isRequired,
    data: React.PropTypes.object.isRequired,
    children: React.PropTypes.element,
    selectMarker: React.PropTypes.func.isRequired,
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
    zoom: React.PropTypes.number.isRequired,
    selected: React.PropTypes.bool,
  }

  handleClick = () => this.props.selectMarker(this.props.type, this.props.data)

  // based on formulas from https://github.com/istarkov/google-map-react/issues/62#issuecomment-157181739
  latLng2World({ lat, lng }) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const x = (lng / 360) + 0.5;
    let y = (0.5 - ((0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI));
    y = y < -1 // eslint-disable-line
      ? -1
      : y > 1
        ? 1
        : y;
    return { x, y };
  }

  world2Screen({ x, y }, zoom) {
    const scale = Math.pow(2, zoom);
    return {
      x: x * scale * 256, // 256 is the default TILE_SIZE
      y: y * scale * 256,
    };
  }

  render() {
    const { type, children } = this.props;

    let markerIcon;
    let customMarker;
    switch (type) {
      case 'distributionCenter':
        markerIcon = 'fa fa-star';
        break;
      case 'retailer':
        markerIcon = 'fa fa-map-marker';
        break;
      case 'shipment':
        markerIcon = 'fa fa-truck';
        break;
      case 'storm': {
        // compute the diameter in pixels of the storm event
        // 1 degree in latitude is ~ 110.574km
        // http://stackoverflow.com/questions/1253499/simple-calculations-for-working-with-lat-lon-km-distance
        const aPointOnTheWeatherCircle = {
          lat: this.props.lat - (this.props.data.event.radiusInKm / 110.574),
          lng: this.props.lng,
        };
        const aPointOnTheWeatherCircleInPixels =
          this.world2Screen(this.latLng2World(aPointOnTheWeatherCircle), this.props.zoom);
        const theWeatherCircleCenterInPixels =
          this.world2Screen(this.latLng2World(this.props), this.props.zoom);
        const diameter =
          2 * Math.abs(aPointOnTheWeatherCircleInPixels.y - theWeatherCircleCenterInPixels.y);

        const bounds = {
          width: `${diameter}px`,
          height: `${diameter}px`,
          left: `-${diameter / 2}px`,
          top: `-${diameter / 2}px`,
        };
        customMarker = (
          <div className={classes[type]}>
            <img className={classes.weatherIcon} role="presentation" src="../storm.png" />
            <div className={classes.weatherCircle} style={bounds} />
          </div>
        );
        break;
      }
      default:
    }

    const divClasses = { };
    divClasses[classes.selected] = this.props.selected;
    divClasses[classes[type]] = true;

    return (
      <div className={classNames(divClasses)} onClick={this.handleClick}>
        {markerIcon ? <i className={markerIcon} /> : ''}
        {customMarker || ''}
      </div>
    );
  }
}
