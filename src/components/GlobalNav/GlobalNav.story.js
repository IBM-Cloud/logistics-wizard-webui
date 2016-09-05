import React from 'react';
import { storiesOf } from '@kadira/storybook';
import GlobalNav from './GlobalNav';
import RoleSwitcher from './RoleSwitcher';

const users = [
  {
    role: 'supplychainmanager',
    loggedIn: true,
  },
  {
    role: 'retailstoremanager',
    location: 'Austin, TX',
  },
];

storiesOf('GlobalNav', module)
  .addDecorator((story) => (
    <div style={{ width: '100vw' }}>
      {story()}
    </div>
  ))
  .add('Default', () => (
    <GlobalNav />
  ))
  .add('Role Switcher', () => (
    <RoleSwitcher users={users} />
  ));
