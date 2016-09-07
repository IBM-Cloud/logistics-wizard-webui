import React from 'react';
import { storiesOf } from '@kadira/storybook';
import GhostButton from './GhostButton';
import classes from './GhostButton.scss';

storiesOf('GhostButton', module)
  .add('Dark', () => (
    <div style={{ backgroundColor: '#000' }}>
      <GhostButton label="Ghost Button" />
    </div>
  ))
  .add('Light', () => (
    <GhostButton
      label="Ghost Button"
      className={classes.button}
      backgroundColor="#FFFFFF"
      labelColor="#0F94A7"
    />
  ));
