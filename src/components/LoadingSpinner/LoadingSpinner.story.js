import React from 'react';
import { storiesOf } from '@kadira/storybook';
import LoadingSpinner from './LoadingSpinner';

storiesOf('LoadingSpinner', module)
  .add('default', () => (
    <LoadingSpinner />
  ));
