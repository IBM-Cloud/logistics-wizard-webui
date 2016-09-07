import React from 'react';
import { Card, CardMedia } from 'material-ui/Card';
import Diagram from '../assets/img/diagram.png';
import Graph from '../assets/img/graph.svg';
import classes from './ArchDiagram.scss';

export const ArchDiagram = () => (
  <div className={classes.archDiagram}>
    <h1>Logistics Wizard Architecture</h1>
    <Card className={classes.diagram}>
      <CardMedia>
        <img src={Diagram} alt="Architecture Diagram" />
      </CardMedia>
    </Card>

    <img src={Graph} role="presentation" className={classes.graph} />
  </div>
);

export default ArchDiagram;
