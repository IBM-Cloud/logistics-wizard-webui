import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Dashboard from './Dashboard';

storiesOf('Dashboard', module)
  .add('default state', () => (
    <Dashboard
      demoName="Test Demo 123"
      dbdata={{ dummyData: 'blah blah' }}
      getAdminData={action('fetching admin data...')}
      params={{ guid: 'asdfa234523' }}
    />
  ));
