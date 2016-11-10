import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import classes from './ShipmentsTable.scss';

export const ShipmentsTable = (props) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Shipment #</TableHeaderColumn>
        <TableHeaderColumn>Status</TableHeaderColumn>
        <TableHeaderColumn>Destination</TableHeaderColumn>
        <TableHeaderColumn>Date Placed</TableHeaderColumn>
        <TableHeaderColumn>Estimated Time of Arrival</TableHeaderColumn>
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
