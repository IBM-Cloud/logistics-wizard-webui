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
import classes from './ShipmentsTable.scss';

const styles = {
  wrapper: {
    border: `1px solid ${palette.borderColor}`,
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

export const ShipmentsTable = (props) => (
  <Table wrapperStyle={styles.wrapper}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn style={styles.meta} colSpan="5">Active Shipments (44)</TableHeaderColumn>
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
      <TableRow>
        <TableRowColumn>12345</TableRowColumn>
        <TableRowColumn>In Transit</TableRowColumn>
        <TableRowColumn>Retailer 1234</TableRowColumn>
        <TableRowColumn>Nov 14, 2016</TableRowColumn>
        <TableRowColumn>Nov 16, 2016</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>12345</TableRowColumn>
        <TableRowColumn>In Transit</TableRowColumn>
        <TableRowColumn>Retailer 1234</TableRowColumn>
        <TableRowColumn>Nov 14, 2016</TableRowColumn>
        <TableRowColumn>Nov 16, 2016</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>12345</TableRowColumn>
        <TableRowColumn>In Transit</TableRowColumn>
        <TableRowColumn>Retailer 1234</TableRowColumn>
        <TableRowColumn>Nov 14, 2016</TableRowColumn>
        <TableRowColumn>Nov 16, 2016</TableRowColumn>
      </TableRow>
      <TableRow>
        <TableRowColumn>12345</TableRowColumn>
        <TableRowColumn>In Transit</TableRowColumn>
        <TableRowColumn>Retailer 1234</TableRowColumn>
        <TableRowColumn>Nov 14, 2016</TableRowColumn>
        <TableRowColumn>Nov 16, 2016</TableRowColumn>
      </TableRow>
    </TableBody>
  </Table>
);

ShipmentsTable.propTypes = {
};

export default ShipmentsTable;
