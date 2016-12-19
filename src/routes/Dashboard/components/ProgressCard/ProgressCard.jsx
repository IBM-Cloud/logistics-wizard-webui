import React from 'react';
import { connect } from 'react-redux';
import cardClasses from '../Dashboard.scss';

export const ProgressCard = (props) => (
  <div className={cardClasses.shipmentsWrapper}>
    <div className={cardClasses.shipmentsHeader}>
      <div className={cardClasses.shipmentsSubtitle}><i className="fa fa-truck" />&nbsp;&nbsp;Shipments Completed</div>
      <div className={cardClasses.shipmentsAmount}>
        {props.shipments.filter(
          shipment => (shipment.status !== 'DELIVERED' && shipment.status !== 'NEW')
        )
        .length}
      </div>
    </div>
  </div>
);

ProgressCard.propTypes = {
  shipments: React.PropTypes.array,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  shipments: state.dashboard.shipments,
});

export default connect(mapStateToProps, {})(ProgressCard);
