import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import LandingPage from './LandingPage';
import Footer from './Footer/Footer';

storiesOf('LandingPage', module)
  .add('default', () => (
    <LandingPage
      clicky={action('You clicked the button.')}
    />
  ))
  .add('custom prop', () => (
    <LandingPage
      customProp="What a fancy example!"
      clicky={action('You clicked the button.')}
    />
  ))
  .add('Footer', () => (
    <Footer />
  ));
