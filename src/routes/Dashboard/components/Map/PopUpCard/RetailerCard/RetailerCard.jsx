import React from 'react';
import { palette } from 'styles/muiTheme';
import { connect } from 'react-redux';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getWeatherObservations } from 'routes/Dashboard/modules/Dashboard';
import ForecastTile from '../../../ForecastTile';
import classes from '../PopUpCard.scss';

const styles = {
  column: {
    padding: '0rem',
    height: '30px',
  },
  column2: {
    padding: '0rem',
    height: '30px',
    fontStyle: 'italic',
  },
};

export class RetailerCard extends React.PureComponent {

  componentWillMount = () => {
    this.getWeatherForecast();
  }

  componentDidUpdate = () => {
    this.getWeatherForecast();
  }

  getWeatherForecast = () => {
    if (!this.props.retailer.address.weather) {
      this.props.retrieveWeatherObservations(
        'retailer',
        this.props.retailer.id,
        this.props.retailer.address.longitude,
        this.props.retailer.address.latitude);
    }
  }

  render() {
    const {
      managerId,
      address,
    } = this.props.retailer;
    const shipments = this.props.shipments;

    return (
      <div>
        <div className={classes.header}>
          <div className={classes.headerLine}>
            <i className={`fa fa-map-marker ${classes.icon}`} />
            { `${address.city}, ${address.state}` }
          </div>
          <div className={classes.headerLine}>
            <i className={`fa fa-user ${classes.icon}`} />
            { managerId || 'No Manager Listed' }
          </div>
        </div>
        {shipments && shipments.length > 0 ?
          <div>
            <div className={classes.tableHeader}>
              <h4 className={`${classes.subtitle2} ${classes.padLeft}`}>
                Incoming Shipments ({shipments.length})
              </h4>
            </div>
            <div style={{ padding: '0 1rem' }}>
              <hr />
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {shipments.map(shipment => (
                    <TableRow>
                      <TableRowColumn style={styles.column}>{this.props.idToNameResolver.resolve('distributionCenter', shipment.fromId)}</TableRowColumn>
                      <TableRowColumn style={styles.column2}>{shipment.status}</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          :
          <h4>No Incoming Shipments</h4>
        }
        <div className={classes.contentContainer}>
          <div className={classes.subtitle2}>Weather Forecasts</div>
          <hr />
          <div><ForecastTile weather={address.weather} /></div>
        </div>
      </div>
    );
  }
}

RetailerCard.propTypes = {
  retailer: React.PropTypes.object.isRequired,
  shipments: React.PropTypes.array,
  idToNameResolver: React.PropTypes.object,
  retrieveWeatherObservations: React.PropTypes.func.isRequired,
};

const mapActionCreators = {
  retrieveWeatherObservations: getWeatherObservations,
};

export default connect(null, mapActionCreators)(RetailerCard);
