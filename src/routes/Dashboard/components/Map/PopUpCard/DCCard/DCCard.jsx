import React from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
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

const DCCard = ({ address, contact, shipments, idToNameResolver }) => (
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
          <h4 className={`${classes.subtitle2} ${classes.padLeft}`}>
            Outgoing Shipments ({shipments.length})
          </h4>
        </div>
        <div style={{ padding: '0 1rem' }}>
          <hr />
          <Table>
            <TableBody displayRowCheckbox={false}>
              {shipments.map(shipment => (
                <TableRow>
                  <TableRowColumn style={styles.column}>{idToNameResolver.resolve('retailer', shipment.toId)}</TableRowColumn>
                  <TableRowColumn style={styles.column2}>{shipment.status}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      :
      <div className={classes.contentContainer}><h4>No Outgoing Shipments</h4></div>
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
  idToNameResolver: React.PropTypes.object,
};

export default DCCard;
