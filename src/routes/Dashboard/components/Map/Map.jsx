import React from 'react';
import GoogleMap from 'google-map-react';
import RaisedButton from 'material-ui/RaisedButton';
import MapMarker from '../MapMarker/';
// map style from https://snazzymaps.com/style/151/ultra-light-with-labels
// https://googlemaps.github.io/js-samples/styledmaps/wizard/
import mapStyle from './Map.style.json';
import classes from './Map.scss';
import ShipmentCard from '../PopUpCard/ShipmentCard';
import RetailerCard from '../PopUpCard/RetailerCard';
import StormCard from '../PopUpCard/StormCard';
import DCCard from '../PopUpCard/DCCard';

function createMapOptions(maps) {
  // Available options can be found in
  // https://github.com/istarkov/google-map-react-examples/blob/master/web/flux/components/examples/x_options/options_map_page.jsx
  return {
    zoomControlOptions: {
      position: maps.ControlPosition.RIGHT_CENTER,
      style: maps.ZoomControlStyle.SMALL,
    },
    mapTypeControlOptions: {
      position: maps.ControlPosition.TOP_RIGHT,
    },
    mapTypeControl: true,
    styles: mapStyle,
  };
}

export const Map = (props) => (
  <div className={classes.map}>
    <GoogleMap
      bootstrapURLKeys={{
        key: __GOOGLE_MAPS_KEY__,
      }}
      center={props.center}
      zoom={props.zoom}
      options={createMapOptions}
    >
      {props.distributionCenters.map((dc, i) =>
        <MapMarker
          type="distributionCenter"
          text={dc.address.city}
          lat={dc.address.latitude}
          lng={dc.address.longitude}
          key={i}
        >
          <DCCard dc={dc} />
        </MapMarker>
      )}
      {props.shipments
        // keep only shipments with a current location
        .filter(shipment => (shipment.currentLocation != null))
        .map((shipment, i) =>
          <MapMarker
            type="shipment"
            lat={shipment.currentLocation.latitude}
            lng={shipment.currentLocation.longitude}
            key={i}
          >
            <ShipmentCard shipment={shipment} />
          </MapMarker>)}
      {props.retailers.map((retailer, i) =>
        <MapMarker
          type="retailer"
          lat={retailer.address.latitude}
          lng={retailer.address.longitude}
          key={i}
        >
          <RetailerCard retailer={retailer} />
        </MapMarker>)}
      {props.storms.map((storm, i) =>
        <MapMarker
          type="storm"
          lat={storm.event.lat}
          lng={storm.event.lon}
          key={i}
        >
          <StormCard storm={storm} />
        </MapMarker>)}
      <RaisedButton
        label="Simulate Storm"
        onClick={props.simulateAction}
        className={classes.simulateButton}
      />
    </GoogleMap>
  </div>
);

Map.propTypes = {
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  distributionCenters: React.PropTypes.array,
  shipments: React.PropTypes.array,
  retailers: React.PropTypes.array,
  storms: React.PropTypes.array,
};

Map.defaultProps = {
  center: [
    39.787232, -100.198712,
  ],
  zoom: 4,
  distributionCenters: [],
  shipments: [],
  retailers: [],
  storms: [],
};

export default Map;
