import React from 'react';
import { storiesOf } from '@kadira/storybook';
import GhostButton from './GhostButton';

storiesOf('GhostButton', module)
  .add('Primary', () => (
    <GhostButton label="Ghost Button" />
  ))
  .add('Secondary', () => (
    <GhostButton
      label="Ghost Button"
      primary={false}
    />
  ));
