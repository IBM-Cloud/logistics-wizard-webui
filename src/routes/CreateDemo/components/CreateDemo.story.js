import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import CreateDemo from './CreateDemo';

storiesOf('CreateDemo', module)
  .add('default state', () => (
    <CreateDemo createDemo={action('Demo Created')} />
  ));
