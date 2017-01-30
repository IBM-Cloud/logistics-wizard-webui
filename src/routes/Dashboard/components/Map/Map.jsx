import React from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import RaisedButton from 'material-ui/RaisedButton';
import { simulateStorm, selectMarker } from 'routes/Dashboard/modules/Dashboard';
import MapMarker from './MapMarker/';
import LoadingSpinner from 'components/LoadingSpinner';
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
    mapTypeControl: false,
    styles: mapStyle,
  };
}

export class Map extends React.PureComponent {

  constructor(props) {
    super(props);
    // this makes sure "this" in onMapChange is correctly bound to "this component"
    // https://medium.com/@goatslacker/react-0-13-x-and-autobinding-b4906189425d#.id09n9obh
    // http://babeljs.io/blog/2015/06/07/react-on-es6-plus
    this.onMapChange = this.onMapChange.bind(this);
  }

  componentWillMount() {
    this.setState({ zoom: this.props.zoom });
  }

  onMapChange(change) {
    this.setState({ zoom: change.zoom });
  }

  isSelected(targetType, targetId) {
    return this.props.selectedMarker &&
      this.props.selectedMarker.type === targetType &&
      this.props.selectedMarker.data.id === targetId;
  }

  render() {
    // a button to simulate a storm
    // or a progress or nothing
    let simulate = '';
    if (this.props.stormLoading) {
      simulate = (<div className={classes.simulateLoading}>
        <LoadingSpinner size={64} />
      </div>);
    }
    else if (this.props.storms.length === 0) {
      simulate = (<RaisedButton
        onClick={this.props.simulateStorm}
        className={classes.simulateButton}
        label="Simulate Storm"
      />);
    }

    return (
      <div className={classes.mapContainer}>
        <div className={classes.map}>
          <PopUpCard />
          <GoogleMap
            bootstrapURLKeys={{ key: __GOOGLE_MAPS_KEY__ }}
            center={this.props.center}
            zoom={this.props.zoom}
            options={createMapOptions}
            onChange={this.onMapChange}
          >
            {this.props.distributionCenters.map(dc =>
              <MapMarker
                type="distributionCenter"
                text={dc.address.city}
                lat={dc.address.latitude}
                lng={dc.address.longitude}
                selectMarker={this.props.selectMarker}
                data={dc}
                key={dc.id}
                zoom={this.state.zoom}
                selected={this.isSelected('distributionCenter', dc.id)}
              />
            )}
            {this.props.shipments
              .filter(shipment => (shipment.currentLocation != null))
              .map(shipment =>
                <MapMarker
                  type="shipment"
                  lat={shipment.currentLocation.latitude}
                  lng={shipment.currentLocation.longitude}
                  key={shipment.id}
                  selectMarker={this.props.selectMarker}
                  data={shipment}
                  zoom={this.state.zoom}
                  selected={this.isSelected('shipment', shipment.id)}
                />
              )}
            {this.props.retailers.map(retailer =>
              <MapMarker
                type="retailer"
                lat={retailer.address.latitude}
                lng={retailer.address.longitude}
                key={retailer.id}
                selectMarker={this.props.selectMarker}
                data={retailer}
                zoom={this.state.zoom}
                selected={this.isSelected('retailer', retailer.id)}
              />
            )}
            {this.props.storms.map((storm, i) =>
              <MapMarker
                type="storm"
                lat={storm.event.lat}
                lng={storm.event.lon}
                key={i}
                selectMarker={this.props.selectMarker}
                data={storm}
                zoom={this.state.zoom}
              />
            )}
          </GoogleMap>
          {simulate}
        </div>
      </div>);
  }
}

Map.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  center: React.PropTypes.array,
  zoom: React.PropTypes.number,
  distributionCenters: React.PropTypes.array,
  shipments: React.PropTypes.array,
  retailers: React.PropTypes.array,
  storms: React.PropTypes.array,
  simulateStorm: React.PropTypes.func.isRequired,
  selectedMarker: React.PropTypes.object,
  stormLoading: React.PropTypes.bool,
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

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapActionCreators = {
  simulateStorm,
  selectMarker,
};

const mapStateToProps = (state) => ({
  shipments: state.dashboard.shipments,
  retailers: state.dashboard.retailers,
  distributionCenters: state.dashboard['distribution-centers'],
  storms: state.dashboard.storms,
  selectedMarker: state.dashboard.infoBox,
  stormLoading: state.dashboard.stormLoading,
});

export default connect(mapStateToProps, mapActionCreators)(Map);
