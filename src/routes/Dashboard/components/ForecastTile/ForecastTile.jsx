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

  constructor(props) {
    super(props);
    this.state = { forecasts: [] };
  }
  componentWillMount = () => {
    this.getWeatherForecast();
  }
  componentWillReceiveProps = () => {
    this.getWeatherForecast();
  }
  getWeatherForecast = () => {
    if (this.props.address) {
      const address = this.props.address;
      api.getWeatherObservations(this.props.token, address.longitude, address.latitude)
      .then((json) => {
        this.setState({ forecasts: json.forecasts });
      }
      );
    }
    return [];
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
          {this.state.forecasts.map((forecast, i) =>
            <TableRow key={forecast.num}>
              <TableRowColumn style={styles.column}>{forecast.dow}</TableRowColumn>
              <TableRowColumn style={styles.column}>{forecast.day.phrase_22char}</TableRowColumn>
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
