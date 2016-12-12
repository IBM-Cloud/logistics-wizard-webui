import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import classes from '../PopUpCard.scss';

const DCCard = ({ address, contact, shipments }) => (
  <div>
    <div className={classes.header}>
      <div className={classes.headerLine}>
        <i className={`fa fa-star ${classes.icon}`} />
        { `${address.city}, ${address.state}` }
      </div>
      <div className={classes.headerLine}>
        <i className={`fa fa-user ${classes.icon}`} />
        { contact }
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
      <div className={classes.contentContainer}>No Outgoing Shipments</div>
    }
  </div>
);


DCCard.propTypes = {
  id: React.PropTypes.number,
  address: React.PropTypes.shape({
    city: React.PropTypes.string.isRequired,
    state: React.PropTypes.string.isRequired,
  }),
  contact: React.PropTypes.string,
  shipments: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
  })),
};

export default DCCard;
