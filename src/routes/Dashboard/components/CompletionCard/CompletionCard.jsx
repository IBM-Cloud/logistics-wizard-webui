import React from 'react';
import cardClasses from '../Dashboard.scss';

export const CompletionCard = (props) => (
  <div className={cardClasses.shipmentsWrapper}>
    <div className={cardClasses.shipmentsHeader}>
      <div className={cardClasses.shipmentsAmount}>
        {props.shipments.filter(
          shipment => (shipment.status == 'DELIVERED')
        )
        .length}
      </div>
      <div className={cardClasses.shipmentsSubtitle}>Shipments Completed</div>
    </div>
    <div className={cardClasses.shipmentsBottom}>
      <div className={cardClasses.selected}>Today</div>
      <div>MTD</div>
      <div>YTD</div>
    </div>
  </div>
);

CompletionCard.propTypes = {
  shipments: React.PropTypes.array,
};

CompletionCard.defaultProps = {
  shipments: [],
};

export default CompletionCard;
