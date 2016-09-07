import 'styles/core.scss';
import React from 'react';
import Header from './Header/Header';
import LogisticsWizard from './LogisticsWizard/LogisticsWizard';
import IconSection from './IconSection/IconSection';
import ArchDiagram from './ArchDiagram/ArchDiagram';
import Footer from './Footer/Footer';
import classes from './LandingPage.scss';

export const LandingPage = () => (
  <div className={classes.landingPage}>
    <Header />
    <LogisticsWizard />
    <IconSection />
    <ArchDiagram />
    <Footer />
  </div>
);

export default LandingPage;
