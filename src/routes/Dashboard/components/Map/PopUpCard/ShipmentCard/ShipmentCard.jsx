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
      updatedAt,
    } = this.props.shipment;

    return (
      <div className={classes.contentContainer}>
        <div className={classes.subtitle}>
          Status
        </div>
        <div>{status}</div>
        {currentLocation &&
          <div>
            <div className={classes.subtitle}>
              Current Location
            </div>
            <div>{`
              ${currentLocation.city},
              ${currentLocation.state}
            `}</div>
          </div>
          }

        <div className={classes.subtitle}>
          Estimated Time of Arrival
        </div>
        <div>{formatTime(estimatedTimeOfArrival)}</div>

        <div className={classes.subtitle}>
          Last Updated
        </div>
        <div>{updatedAt ? formatTime(updatedAt) : 'N/A'}</div>

        {currentLocation &&
          <div>
            <div className={classes.subtitle}>
              Current Weather
            </div>
            <div>
              {currentLocation.weather ?
               currentLocation.weather.observation.wx_phrase :
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
};

const mapActionCreators = {
  retrieveWeatherObservations: getWeatherObservations,
};

export default connect(null, mapActionCreators)(ShipmentCard);
