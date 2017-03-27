import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { getWeatherObservations } from 'routes/Dashboard/modules/Dashboard';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from '../PopUpCard.scss';

const timeFormat = 'MMM Do, h:mm a';

const formatTime = time => moment(time).format(timeFormat);

export class ShipmentCard extends React.PureComponent {

  componentWillMount = () => {
    this.getWeatherForecast();
  }

  componentDidUpdate = () => {
    this.getWeatherForecast();
  }

  getWeatherForecast = () => {
    if (this.props.shipment.currentLocation && !this.props.shipment.currentLocation.weather) {
      this.props.retrieveWeatherObservations(
        'shipment',
        this.props.shipment.id,
        this.props.shipment.currentLocation.longitude,
        this.props.shipment.currentLocation.latitude);
    }
  }

  render() {
    const {
      status,
      currentLocation,
      estimatedTimeOfArrival,
      fromId,
      toId,
      averageSpeed,
      shipmentHumidity,
      shipmentTemp,
    } = this.props.shipment;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.subtitle2}>
          Status
        </div>
        <div>{status}</div>
        {currentLocation &&
          <div>
            <div className={classes.subtitle2}>
              Current Location
            </div>
            <div>{`
              ${currentLocation.city},
              ${currentLocation.state}
            `}</div>
          </div>
          }

        { status !== 'DELIVERED' &&
          <div>
            <div className={classes.subtitle2}>
              Estimated Time of Arrival
            </div>
            <div>{formatTime(estimatedTimeOfArrival)}</div>
          </div>
        }

        <div className={classes.subtitle2}>
          Shipment Data
        </div>
        <div>
          <i className={`fa fa-car ${classes.icon}`} aria-hidden="true" />
          {`Average Speed: ${averageSpeed || '-'} mph`}
        </div>
        <div>
          <i className={`fa fa-snowflake-o ${classes.icon}`} aria-hidden="true" />
          {`Humidity: ${shipmentHumidity || '-'} %`}
        </div>
        <div>
          <i className={`fa fa-thermometer ${classes.icon}`} aria-hidden="true" />
          {`Temperature: ${shipmentTemp || '-'}°F`}
        </div>

        <div className={classes.subtitle2}>
          Origin
        </div>
        <div>{this.props.idToNameResolver.resolve('distributionCenter', fromId)}</div>

        <div className={classes.subtitle2}>
          Destination
        </div>
        <div>{this.props.idToNameResolver.resolve('retailer', toId)}</div>

        {currentLocation &&
          <div>
            <div className={classes.subtitle2}>
              Current Weather
            </div>
            <div>
              {currentLocation.weather ?
               `${currentLocation.weather.observation.temp}° | ${currentLocation.weather.observation.wx_phrase}` :
               (<div style={{ textAlign: 'center' }}><LoadingSpinner size={60} /></div>)}
            </div>
          </div>
        }
      </div>
    );
  }
}

ShipmentCard.propTypes = {
  shipment: React.PropTypes.object.isRequired,
  retrieveWeatherObservations: React.PropTypes.func.isRequired,
  idToNameResolver: React.PropTypes.object,
};

const mapActionCreators = {
  retrieveWeatherObservations: getWeatherObservations,
};

export default connect(null, mapActionCreators)(ShipmentCard);
