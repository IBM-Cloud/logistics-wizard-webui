import React from 'react';
import { connect } from 'react-redux';
import { palette } from 'styles/muiTheme';
import { selectMarker } from 'routes/Dashboard/modules/Dashboard';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const moment = require('moment');

const timeFormat = 'MMM Do, h:mm a';

const styles = {
  wrapper: {
    border: `1px solid ${palette.borderColor}`,
    marginBottom: '2rem',
  },
  header: {
    fontWeight: '700',
    paddingTop: '1.5rem',
    paddingBottom: '0.5rem',
  },
  meta: {
    color: palette.textColor,
    fontSize: '0.875rem',
    fontWeight: '300',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
};


export class ShipmentsTable extends React.PureComponent {

  handleClick = (rowNumber) => this.props.selectMarker('shipment', this.props.shipments[rowNumber]);

  render() {
    const props = this.props;
    return (
      <Table
        wrapperStyle={styles.wrapper} onCellClick={(rowNumber) => this.handleClick(rowNumber)}
      >
        <TableHeader displaySelectAll={false} adjustForrowNumberCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={styles.meta} colSpan="5">
          Active Shipments ({props.shipments.length})
        </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn style={styles.header}>Shipment #</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Status</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Destination</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Date Placed</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Estimated Time of Arrival</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.shipments.map(shipment =>
            <TableRow
              key={shipment.id}
            >
              <TableRowColumn>{shipment.id}</TableRowColumn>
              <TableRowColumn>{shipment.status}</TableRowColumn>
              <TableRowColumn>{shipment.toId}</TableRowColumn>
              <TableRowColumn>{moment(shipment.createdAt).format(timeFormat)}</TableRowColumn>
              <TableRowColumn>
                {moment(shipment.estimatedTimeOfArrival).format(timeFormat)}
              </TableRowColumn>
            </TableRow>
      )}
        </TableBody>
      </Table>
    );
  }

}

ShipmentsTable.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  shipments: React.PropTypes.array,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapActionCreators = {
  selectMarker,
};

const mapStateToProps = (state) => ({
  shipments: state.dashboard.shipments,
});


export default connect(mapStateToProps, mapActionCreators)(ShipmentsTable);
