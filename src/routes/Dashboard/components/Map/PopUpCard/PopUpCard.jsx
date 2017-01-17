import React from 'react';
import { connect } from 'react-redux';
import { selectMarker } from 'routes/Dashboard/modules/Dashboard';
import classes from './PopUpCard.scss';
import ShipmentCard from './ShipmentCard';
import RetailerCard from './RetailerCard';
import StormCard from './StormCard';
import DCCard from './DCCard';

const showSelectedInfo = (dashboard) => { // eslint-disable-line
  if (dashboard.infoBox.type === 'distributionCenter') {
    const selectedDc = dashboard['distribution-centers']
      .find(dc => dc.id === dashboard.infoBox.data.id);
    const shipments = dashboard.shipments
      .filter(shipment => shipment.fromId === selectedDc.id);
    return (
      <DCCard
        contact={selectedDc.contact.name}
        address={selectedDc.address}
        shipments={shipments}
      />
    );
  }
  else if (dashboard.infoBox.type === 'shipment') {
    const selectedShipment = dashboard.shipments
      .find(shipment => shipment.id === dashboard.infoBox.data.id);
    return (
      <ShipmentCard shipment={selectedShipment} />
    );
  }
  else if (dashboard.infoBox.type === 'retailer') {
    const selectedRetailer = dashboard.retailers
      .find(retailer => retailer.id === dashboard.infoBox.data.id);
    return (
      <RetailerCard retailer={selectedRetailer} />
    );
  }
  else if (dashboard.infoBox.type === 'storm') {
    return (
      <StormCard storm={dashboard.infoBox.data} />
    );
  }
  else if (dashboard.infoBox.type === 'hidden') {
    return '';
  }

  console.error('Invalid info type passed to showSelectedInfo in Map.jsx');
  return '';
};

const formatTitle = type => {
  const titles = {
    distributionCenter: 'Distribution Center',
    retailer: 'Retail Location',
    shipment: 'Shipment',
    storm: 'Weather Alert',
  };

  return titles[type] || '';
};

const PopUpCard = ({ dashboard }) => (
  <div className={`${classes.wrapper} ${classes[dashboard.infoBox.type]}`}>
    <div className={classes.title}>
      <h4>{formatTitle(dashboard.infoBox.type)} {dashboard.infoBox.data.id}</h4>
      <i className={`fa fa-times-circle-o ${classes.closeIcon}`} />
    </div>
    {showSelectedInfo(dashboard)}
  </div>
);

PopUpCard.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  dashboard: React.PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapActionCreators)(PopUpCard);
