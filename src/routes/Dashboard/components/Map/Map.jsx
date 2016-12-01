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

const showSelectedInfo = ({ type, data }) => { // eslint-disable-line
  if (type === 'distributionCenter') {
    return (
      <DCCard
        contact={data.contact.name}
        id={data.id}
        address={data.address}
        shipments={data.shipments}
      />
    );
  }
  else if (type === 'shipment') {
    return (
      <ShipmentCard shipment={data} />
    );
  }
  else if (type === 'retailer') {
    return (
      <RetailerCard retailer={data} />
    );
  }
  else if (type === 'storm') {
    return (
      <StormCard storm={data} />
    );
  }
  else if (type === 'hidden') {
    return '';
  }

  console.error('Invalid info type passed to showSelectedInfo in Map.jsx');
  return '';
};

export const Map = (props) => (
  <div className={classes.map}>
    {showSelectedInfo(props.infoBox)}
    <GoogleMap
      bootstrapURLKeys={{ key: __GOOGLE_MAPS_KEY__ }}
      center={props.center}
      zoom={props.zoom}
      options={createMapOptions}
    >
      {props.distributionCenters.map(dc =>
        <MapMarker
          type="distributionCenter"
          text={dc.address.city}
          lat={dc.address.latitude}
          lng={dc.address.longitude}
          selectMarker={props.selectMarker}
          data={dc}
          key={dc.id}
        />
      )}
      {props.shipments
        .filter(shipment => (shipment.currentLocation != null))
        .map(shipment =>
          <MapMarker
            type="shipment"
            lat={shipment.currentLocation.latitude}
            lng={shipment.currentLocation.longitude}
            key={shipment.id}
            selectMarker={props.selectMarker}
            data={shipment}
          />
        )}
      {props.retailers.map(retailer =>
        <MapMarker
          type="retailer"
          lat={retailer.address.latitude}
          lng={retailer.address.longitude}
          key={retailer.id}
          selectMarker={props.selectMarker}
          data={retailer}
        />
      )}
      {props.weather.map((storm, i) =>
        <MapMarker
          type="storm"
          lat={storm.event.lat}
          lng={storm.event.lon}
          key={i}
          selectMarker={props.selectMarker}
          data={storm}
        />
      )}
      <RaisedButton
        label="Simulate Storm"
        onClick={props.simulateWeather}
        className={classes.simulateButton}
      />
    </GoogleMap>
  </div>
);

Map.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  infoBox: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  }),
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
