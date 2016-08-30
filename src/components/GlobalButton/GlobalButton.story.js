import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import GlobalButton from './GlobalButton';

storiesOf('GlobalButton', module)
  .add('default', () => (
    <GlobalButton
      clicky={action('You clicked the button.')}
    />
  ))
  .add('custom prop', () => (
    <GlobalButton
      customProp="What a fancy example!"
      clicky={action('You clicked the button.')}
    />
  ));
