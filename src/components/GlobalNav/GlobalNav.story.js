import React from 'react';
import { storiesOf } from '@kadira/storybook';
import GlobalNav from './GlobalNav';
import RoleSwitcher from './RoleSwitcher';

const users = [
  {
    id: 1,
    role: 'supplychainmanager',
    loggedIn: true,
  },
  {
    id: 2,
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
  .add('Not Logged in', () => (
    <GlobalNav />
  ))
  .add('Logged in', () => (
    <GlobalNav users={users} />
  ))
  .add('Role Switcher', () => (
    <RoleSwitcher users={users} />
  ));
