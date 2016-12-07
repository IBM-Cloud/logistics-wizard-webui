import React from 'react';
import { connect } from 'react-redux';
import api from 'services';
import classes from './ForecastTile.scss';
import RaisedButton from 'material-ui/RaisedButton';
import { palette } from 'styles/muiTheme';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const styles = {
  wrapper: {
    maxHeight: '400px',
    overflow: 'hidden',
  },

  meta: {
    color: palette.textColor,

  },
  column: {
    padding: '0rem',
    height: '30px',
  },
};

// Use named export for unconnected component (for tests)
export class ForecastTile extends React.PureComponent {

  componentWillMount = () => {
    this.getWeatherForecast();
  }
  componentDidUpdate = () => {
    this.getWeatherForecast();
  }

  // TOOD: Use redux
  getWeatherForecast = () => {
    if (!this.props.token) return;

    if (this.props.address && !this.props.address.weather) {
      const address = this.props.address;
      api.getWeatherObservations(this.props.token, address.longitude, address.latitude)
      .then((json) => {
        console.log('Got weather for ', address);
        console.log('json: ', json);
        this.props.address.weather = json.forecasts;
        if (this.props.address.weather) this.forceUpdate();
      }
      );
    }
  }


  render() {
    return (
      <Table wrapperStyle={styles.wrapper}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={styles.header}>Day</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Summary</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} >
          { this.props.address.weather && this.props.address.weather.map((forecast, i) =>
            <TableRow key={i}>
              <TableRowColumn style={styles.column}>{forecast.dow}</TableRowColumn>
              <TableRowColumn style={styles.column}>
                {forecast.day ? forecast.day.phrase_22char : forecast.night.phrase_22char}
              </TableRowColumn>
            </TableRow>
        )}
        </TableBody>
      </Table>

    );
  }
}

ForecastTile.propTypes = {
  token: React.PropTypes.string.isRequired,
  address: React.PropTypes.object.isRequired,
};


// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  token: state.demoSession.token,
});

export default connect(mapStateToProps, {})(ForecastTile);
