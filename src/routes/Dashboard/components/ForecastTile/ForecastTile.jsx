import React from 'react';
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
const ForecastTile = ({ weather }) => {
  if (!weather) {
    return (<div>Please wait...</div>);
  }

  return (<Table wrapperStyle={styles.wrapper}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={styles.header}>Day</TableHeaderColumn>
        <TableHeaderColumn style={styles.header}>Summary</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} >
      { weather.forecasts.slice(0, 5).map((forecast, i) =>
        <TableRow key={i}>
          <TableRowColumn style={styles.column}>{forecast.dow}</TableRowColumn>
          <TableRowColumn style={styles.column}>
            {forecast.day ? forecast.day.phrase_22char : forecast.night.phrase_22char}
          </TableRowColumn>
        </TableRow>
      )}
    </TableBody>
  </Table>);
};

ForecastTile.propTypes = {
  weather: React.PropTypes.object,
};

export default ForecastTile;
