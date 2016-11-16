import React from 'react';
import cardClasses from '../Dashboard.scss';

export const ProgressCard = (props) => (
  <div className={cardClasses.shipmentsWrapper}>
    <div className={cardClasses.shipmentsHeader}>
      <div className={cardClasses.shipmentsAmount}>44</div>
      <div className={cardClasses.shipmentsSubtitle}>Shipments In Progress</div>
    </div>
    <div className={cardClasses.shipmentsBottom}>
      <div className={cardClasses.selected}>In Progress</div>
      <div>Pending</div>
    </div>
  </div>
);

ProgressCard.propTypes = {
};

export default ProgressCard;
