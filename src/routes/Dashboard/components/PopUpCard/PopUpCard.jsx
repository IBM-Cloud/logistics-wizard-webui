import React from 'react';
import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import classes from './PopUpCard.scss';


const styles = {
  paper: {
    height: 300,
    width: 250,
    margin: 20,
    overflow: 'scroll',
  },
};


const PopUpCard = (props) => {
  const location = props.location
    ? `${props.location.city}, ${props.location.state}`
    : '...';
  const title = props.title
    ? `Shipment ${props.title}`
    : '...';
  return (
    <Paper style={styles.paper} zDepth={2}>
      <Toolbar>
        <ToolbarTitle text={title} />
      </Toolbar>
      <div className={classes.mainSection}>
        <pre>
          Status: { props.status ? props.status : 'loading...'}{"\n"}
          Location: { location }
        </pre>
      </div>
    </Paper>
  );
};

PopUpCard.propTypes = {
  location: React.PropTypes.object.isRequired,
  status: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default PopUpCard;
