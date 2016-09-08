import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import PopUpCard from './PopUpCard';

storiesOf('PopUpCard', module)
  .add('default state', () => (
    <PopUpCard
      id="1339"
      params={{ token: '3UbUI0ojQAsO6hIdwo0YCQvjeA38bJ3NY2h5Z2EjGVKyBdmIaIxTMYUBtBRIeWBT' }}
      />
  ));
