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

const dc1 = {
  contact: 'Joseph Smith',
  id: 1,
  address: {
    state: 'Utah',
    city: 'Salt Lake City',
    country: 'US',
    latitude: 40.71,
    longitude: -111.9,
  },
  shipments: [
    {
      id: '089124',
      status: 'In Transit',
    },
    {
      id: '089125',
      status: 'In Transit',
    },
    {
      id: '089126',
      status: 'In Transit',
    },
  ],
};


export const Map = (props) => (
  <div className={classes.map}>
    <DCCard contact={dc1.contact} id={dc1.id} address={dc1.address} shipments={dc1.shipments} />
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
        />
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
      {props.weather.map((storm, i) =>
        <MapMarker
          type="storm"
          lat={storm.lat}
          lng={storm.lon}
          key={i}
        />)}
      <RaisedButton
        label="Simulate Storm"
        onClick={props.simulateWeather}
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
  weather: React.PropTypes.array,
  simulateWeather: React.PropTypes.func.isRequired,
};

Map.defaultProps = {
  center: [
    39.787232, -100.198712,
  ],
  zoom: 4,
  distributionCenters: [],
  shipments: [],
  retailers: [],
  weather: [],
};

export default Map;
