import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import RaisedButton from 'material-ui/RaisedButton';
import { simulateWeather, selectMarker } from 'routes/Dashboard/modules/Dashboard';
import MapMarker from './MapMarker/';
// map style from https://snazzymaps.com/style/151/ultra-light-with-labels
// https://googlemaps.github.io/js-samples/styledmaps/wizard/
import mapStyle from './Map.style.json';
import classes from './Map.scss';
import PopUpCard from './PopUpCard';

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
    <PopUpCard />
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
    </GoogleMap>
    <RaisedButton
      label="Simulate Storm"
      onClick={props.simulateWeather}
      className={classes.simulateButton}
    />
  </div>
);

Map.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
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

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapActionCreators = {
  simulateWeather,
  selectMarker,
};

const mapStateToProps = (state) => ({
  shipments: state.dashboard.shipments,
  retailers: state.dashboard.retailers,
  distributionCenters: state.dashboard['distribution-centers'],
  weather: state.dashboard.weather,
});

export default connect(mapStateToProps, mapActionCreators)(Map);
