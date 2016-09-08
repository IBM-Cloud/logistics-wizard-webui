import React from 'react';
import classes from './MapMarker.scss';

export const MapMarker = (props) => (
  <div className={classes[props.type]}>
    <i className={'fa fa-'  + props.icon} />
    <div className={classes.mapMarkerPopup}>
      {props.children}
    </div>
  </div>
);

MapMarker.propTypes = {
  text: React.PropTypes.oneOf(['distributionCenter', 'retailer', 'shipment']),
  icon: React.PropTypes.string,
  type: React.PropTypes.string.isRequired,
  children: React.PropTypes.element,
};

export default MapMarker;
