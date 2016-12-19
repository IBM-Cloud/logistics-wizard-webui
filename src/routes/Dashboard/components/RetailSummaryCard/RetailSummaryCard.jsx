import React from 'react';
import { connect } from 'react-redux';
import retailClasses from './RetailSummaryCard.scss';

export const RetailSummaryCard = (props) => (
  <div className={retailClasses.shipmentsWrapper}>
    <div className={retailClasses.shipmentsHeader}>
      <div className={retailClasses.shipmentsSubtitle}>
        <i className="fa fa-circle" />
        &nbsp;&nbsp;Retail Centers
      </div>
      <div className={retailClasses.shipmentsAmount}>
        {props.retailers.length}
      </div>
    </div>
  </div>
);

RetailSummaryCard.propTypes = {
  retailers: React.PropTypes.array,
};

// ------------------------------------
// Connect Component to Redux
// ------------------------------------

const mapStateToProps = (state) => ({
  retailers: state.dashboard.retailers,
});

export default connect(mapStateToProps, {})(RetailSummaryCard);
