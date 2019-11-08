import React from 'react';
import { palette } from 'styles/muiTheme';
import { connect } from 'react-redux';
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

export class RetailerCard extends React.PureComponent {

  render() {
    const {
      managerId,
      address,
    } = this.props.retailer;
    const shipments = this.props.shipments;

    return (
      <div>
        <div className={classes.header}>
          <div className={classes.headerLine}>
            <i className={`fa fa-map-marker ${classes.icon}`} />
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
              <h4 className={`${classes.subtitle2} ${classes.padLeft}`}>
                Incoming Shipments ({shipments.length})
              </h4>
            </div>
            <div style={{ padding: '0 1rem' }}>
              <hr />
              <Table>
                <TableBody displayRowCheckbox={false}>
                  {shipments.map(shipment => (
                    <TableRow key={`TR-${shipment.id}`}>
                      <TableRowColumn style={styles.column}>
                        <i className={`fa fa-truck ${classes.icon}`} />&nbsp;
                        {this.props.idToNameResolver.resolve('distributionCenter', shipment.fromId)}
                      </TableRowColumn>
                      <TableRowColumn style={styles.column2}>{shipment.status}</TableRowColumn>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          :
          <h4>No Incoming Shipments</h4>
        }
      </div>
    );
  }
}

RetailerCard.propTypes = {
  retailer: React.PropTypes.object.isRequired,
  shipments: React.PropTypes.array,
  idToNameResolver: React.PropTypes.object,
};

const mapActionCreators = {
};

export default connect(null, mapActionCreators)(RetailerCard);
