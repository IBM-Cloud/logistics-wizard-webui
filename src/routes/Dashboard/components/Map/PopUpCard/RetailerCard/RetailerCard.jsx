import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import classes from '../PopUpCard.scss';

const RetailerCard = ({ managerId, address, shipments }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.headerLine}>
        <i className={`fa fa-star ${classes.icon}`} />
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
          <h4 className={`${classes.subtitle} ${classes.padLeft}`}>
            Outgoing Shipments ({shipments.length})
          </h4>
        </div>
        <div style={{ padding: '0 1rem' }}>
          <Table>
            <TableBody displayRowCheckbox={false}>
              {shipments.map(shipment => (
                <TableRow>
                  <TableRowColumn style={{ paddingLeft: '0' }}>{shipment.id}</TableRowColumn>
                  <TableRowColumn style={{ fontStyle: 'italic' }}>{shipment.status}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      :
      <div className={classes.contentContainer}>No Incoming Shipments</div>
    }
  </div>
);

RetailerCard.propTypes = {
  shipments: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  })),
  managerId: React.PropTypes.string.isRequired,
  address: React.PropTypes.shape({
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
  }).isRequired,
};

export default RetailerCard;
