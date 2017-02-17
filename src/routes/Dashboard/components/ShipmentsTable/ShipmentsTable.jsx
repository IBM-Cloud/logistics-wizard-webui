import React from 'react';
import { connect } from 'react-redux';
import { palette } from 'styles/muiTheme';
import { selectMarker } from 'routes/Dashboard/modules/Dashboard';
import NameResolver from '../NameResolver';

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
    flexGrow: 1,
    backgroundColor: 'white',
  },
  header: {
    fontWeight: '700',
    paddingTop: '1rem',
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

  handleClick = (rowNumber) => this.props.selectMarker('shipment', this.props.dashboard.shipments[rowNumber]);

  render() {
    const props = this.props;
    const idToNameResolver = NameResolver(this.props.dashboard);
    return (
      <Table
        wrapperStyle={styles.wrapper}
        onCellClick={(rowNumber) => this.handleClick(rowNumber)}
      >
        <TableHeader displaySelectAll={false} adjustForrowNumberCheckbox displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn style={styles.header}>Shipment #</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Status</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Origin</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Destination</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Date Placed</TableHeaderColumn>
            <TableHeaderColumn style={styles.header}>Estimated Time of Arrival</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {props.dashboard.shipments.map(shipment =>
            <TableRow
              key={shipment.id}
              style={{ padding: '40px' }}
            >
              <TableRowColumn>{shipment.id}</TableRowColumn>
              <TableRowColumn>{shipment.status}</TableRowColumn>
              <TableRowColumn>{idToNameResolver.resolve('distributionCenter', shipment.fromId)}</TableRowColumn>
              <TableRowColumn>{idToNameResolver.resolve('retailer', shipment.toId)}</TableRowColumn>
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
  dashboard: React.PropTypes.object,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------
const mapActionCreators = {
  selectMarker,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});


export default connect(mapStateToProps, mapActionCreators)(ShipmentsTable);
