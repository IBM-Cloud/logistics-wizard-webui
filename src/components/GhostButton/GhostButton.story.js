import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import GhostButton from './GhostButton';

storiesOf('GhostButton', module)
  .add('default', () => (
    <GhostButton
      clicky={action('You clicked the button.')}
    />
  ))
  .add('custom prop', () => (
    <GhostButton
      customProp="What a fancy example!"
      clicky={action('You clicked the button.')}
    />
  ));
