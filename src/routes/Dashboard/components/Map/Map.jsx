import React from 'react';
import GoogleMap from 'google-map-react';
import MapMarker from '../MapMarker/';
// map style from https://snazzymaps.com/style/151/ultra-light-with-labels
// https://googlemaps.github.io/js-samples/styledmaps/wizard/
import mapStyle from './Map.style.json';
import PopUpCard from '../PopUpCard/';

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
  <GoogleMap
    bootstrapURLKeys={{
      key: '',
    }}
    center={props.center}
    zoom={props.zoom}
    options={createMapOptions}
  >
    {props.distributionCenters.map(dc => <MapMarker
      type="distributionCenter"
      text={dc.address.city}
      lat={dc.address.latitude}
      lng={dc.address.longitude}
    />)}
    {props.shipments
      // keep only shipments with a current location
      .filter(shipment => (shipment.currentLocation != null))
      .map(shipment => <MapMarker
        type="shipment"
        lat={shipment.currentLocation.latitude}
        lng={shipment.currentLocation.longitude}
      >
        <PopUpCard shipment={shipment} />
      </MapMarker>)}
    {props.retailers
      // keep only shipments with a current location
      .map(retailer => <MapMarker
        type="retailer"
        lat={retailer.address.latitude}
        lng={retailer.address.longitude}
      />)}
  </GoogleMap>
);

Map.propTypes = {
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  distributionCenters: React.PropTypes.array,
  shipments: React.PropTypes.array,
  retailers: React.PropTypes.array,
};

Map.defaultProps = {
  center: [
    39.787232, -100.198712,
  ],
  zoom: 4,
  distributionCenters: [],
  shipments: [],
  retailers: [],
};

export default Map;
