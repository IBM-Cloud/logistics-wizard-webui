import React from 'react';
import classes from './MapMarker.scss';

export const MapMarker = (props) => {
  let markerIcon;
  switch (props.type) {
    case 'retailer':
      markerIcon = 'fa fa-circle';
      break;
    case 'shipment':
      markerIcon = 'fa fa-truck';
      break;
    case 'storm':
      return (<div><img className={classes.weatherIcon} src="../storm.png" /><div className={classes.weatherCircle} /></div>);
      break;
    default:
  }

  return (<div className={classes[props.type]}>
    {markerIcon ? <i className={markerIcon} /> : ''}
    <div className={classes.mapMarkerPopup}>
      {props.children}
    </div>
  </div>);
};

MapMarker.propTypes = {
  type: React.PropTypes.oneOf(['distributionCenter', 'retailer', 'shipment', 'storm']).isRequired,
  children: React.PropTypes.element,
};

export default MapMarker;
