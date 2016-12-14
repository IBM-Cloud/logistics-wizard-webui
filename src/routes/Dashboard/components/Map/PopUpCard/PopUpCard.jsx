import React from 'react';
import { connect } from 'react-redux';
import { selectMarker } from 'routes/Dashboard/modules/Dashboard';
import classes from './PopUpCard.scss';
import ShipmentCard from './ShipmentCard';
import RetailerCard from './RetailerCard';
import StormCard from './StormCard';
import DCCard from './DCCard';

const showSelectedInfo = ({ type, data }) => { // eslint-disable-line
  if (type === 'distributionCenter') {
    return (
      <DCCard
        contact={data.contact.name}
        address={data.address}
        shipments={data.shipments}
      />
    );
  }
  else if (type === 'shipment') {
    return (
      <ShipmentCard shipment={data} />
    );
  }
  else if (type === 'retailer') {
    return (
      <RetailerCard
        managerId={data.managerId}
        address={data.address}
      />
    );
  }
  else if (type === 'storm') {
    return (
      <StormCard storm={data} />
    );
  }
  else if (type === 'hidden') {
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

const PopUpCard = ({ infoBox }) => (
  <div className={`${classes.wrapper} ${classes[infoBox.type]}`}>
    <div className={classes.title}>
      <h4>{formatTitle(infoBox.type)} {infoBox.data.id}</h4>
      <i className={`fa fa-times-circle-o ${classes.closeIcon}`} />
    </div>
    {showSelectedInfo(infoBox)}
  </div>
);

PopUpCard.propTypes = {
  selectMarker: React.PropTypes.func.isRequired,
  infoBox: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    data: React.PropTypes.object.isRequired,
  }),
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapActionCreators = {
  selectMarker,
};

const mapStateToProps = (state) => ({
  infoBox: state.dashboard.infoBox,
});

export default connect(mapStateToProps, mapActionCreators)(PopUpCard);
