import React from 'react';
import { connect } from 'react-redux';
import cardClasses from '../Dashboard.scss';

export const DCSummaryCard = (props) => (
  <div className={cardClasses.shipmentsWrapper}>
    <div className={cardClasses.shipmentsHeader}>
      <div className={cardClasses.shipmentsSubtitle}>
        <i className="fa fa-star" />
        &nbsp;&nbsp;Distribution Centers
      </div>
      <div className={cardClasses.shipmentsAmount}>
        {props.dcs.length}
      </div>
    </div>
  </div>
);

DCSummaryCard.propTypes = {
  dcs: React.PropTypes.array,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  dcs: state.dashboard['distribution-centers'],
});

export default connect(mapStateToProps, {})(DCSummaryCard);
