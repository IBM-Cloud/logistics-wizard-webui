import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import classes from './Dashboard.scss';
import PopUpCard from './PopUpCard';


const items = [];

export default class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectedShipmentID: '',
      filteredShipment: {},
    };
    props.getAdminData(props.params.guid);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps = () => {
    const loadedShipments = this.props.dbdata && this.props.dbdata.shipments;
    if (loadedShipments) {
      for (const shipment of this.props.dbdata.shipments) {
        items.push(
          <MenuItem
            value={shipment.id}
            key={shipment.id}
            primaryText={`Shipment ${shipment.id}`}
          />
        );
      }
      if (!this.state.selectedShipmentID) this.search(this.props.dbdata.shipments[0].id);
    }
  }

  handleChange = (event, index, value) => {
    this.search(value);
  }
  search = (id) => {
    this.setState({ selectedShipmentID: id });
    const filteredShipment = this.props.dbdata.shipments.filter(
      entry => entry.id === parseInt(id, 10)
    );
    this.setState({ filteredShipment: filteredShipment[0] });
  }
  render() {
    const shipment = this.state.filteredShipment ? this.state.filteredShipment : {};
    return (
      <div className={classes.dashboard}>
        <h4>Dashboard - Yay, you created a demo!</h4>
        <p>Demo Name: {this.props.demoName || 'loading...'}</p>
        <h4>Select shipment: </h4>
        <SelectField value={this.state.selectedShipmentID} onChange={this.handleChange}>
          {items}
        </SelectField>
        <PopUpCard
          location={shipment.currentLocation || {}}
          title={shipment.id ? `Shipment ${shipment.id.toString()}` : '...'}
          status={shipment.status || '...'}
        />
        <pre>{this.props.dbdata ? JSON.stringify(this.props.dbdata, null, 2) : 'loading...'}</pre>
      </div>
    );
  }
}


Dashboard.propTypes = {
  demoName: React.PropTypes.string.isRequired,
  dbdata: React.PropTypes.object.isRequired,
  getAdminData: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};
