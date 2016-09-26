import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import classes from './CreateDemo.scss';

export class CreateDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      demoGuid: '',
    };
  }

  handleInput = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleClick = () => {
    if (this.state.demoGuid !== '') {
      this.props.createDemo({ guid: this.state.demoGuid });
    }
    else {
      this.props.createDemo();
    }
  }

  render() {
    return (
      <Paper className={classes.container}>
        <div className={classes.mainSection}>
          <div className={classes.inputs}>
            <TextField
              id="demoGuid"
              fullWidth
              value={this.state.demoGuid}
              floatingLabelText="Join an existing demo session"
              floatingLabelFixed
              hintText="(optional) Enter an existing demo GUID"
              onChange={this.handleInput}
            />
          </div>
          <div className={classes.buttonWrapper}>
            <RaisedButton
              primary
              className={classes.button}
              label="Start the Logistics Wizard Demo"
              onClick={this.handleClick}
            />
          </div>
        </div>
      </Paper>
    );
  }
}

CreateDemo.propTypes = {
  createDemo: React.PropTypes.func.isRequired,
  containerQuery: React.PropTypes.object,
};

export default CreateDemo;
