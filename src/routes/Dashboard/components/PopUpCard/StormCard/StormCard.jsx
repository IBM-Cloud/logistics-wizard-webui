import React from 'react';
import Paper from 'material-ui/Paper';
import classes from '../PopUpCard.scss';


const styles = {
  paper: {
    width: '140',
  },
};

const StormCard = (props) => {
  let eventDesc;
  let severity;
  let shipmentRecommendations;
  if (props.storm) {
    const event = props.storm.event;
    const recommendations = props.storm.recommendations;
    if (event.event_desc) {
      eventDesc = (
        <div><h6>TYPE</h6> {event.event_desc}</div>
      );
    }

    if (event.severity) {
      severity = (
        <div><h6>Severity</h6> {event.severity}</div>
      );
    }

    if (recommendations) {
      shipmentRecommendations = (
        <div>{recommendations.length} Recommendations</div>
      );
    }
  }
  const title = props.storm
    ? 'Storm'
    : '...';
  return (
    <Paper zDepth={2} style={styles.paper}>
      <div className={classes.mainSection}>
        <h4>{title}</h4>
        <hr />
        { eventDesc }
        { severity }
        { shipmentRecommendations }
      </div>
    </Paper>
  );
};

StormCard.propTypes = {
  storm: React.PropTypes.object.isRequired,
};

export default StormCard;
