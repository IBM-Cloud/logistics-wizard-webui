import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import LandingPage from './LandingPage';
import Header from './Header/Header';
import LogisticsWizard from './LogisticsWizard/LogisticsWizard';
import IconSection from './IconSection/IconSection';
import ArchDiagram from './ArchDiagram/ArchDiagram';
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
  .add('Header', () => (
    <Header />
  ))
  .add('Logistics Wizard', () => (
    <LogisticsWizard />
  ))
  .add('Icon Section', () => (
    <IconSection />
  ))
  .add('Architecture Diagram', () => (
    <ArchDiagram />
  ))
  .add('Footer', () => (
    <Footer />
  ));
