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
  type: React.PropTypes.oneOf(['distributionCenter', 'retailer', 'shipment']).isRequired,
  icon: React.PropTypes.string,
  children: React.PropTypes.element,
};

export default MapMarker;
