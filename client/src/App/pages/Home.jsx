import React from 'react';
import { Link } from 'react-router-dom';
import AppContainer from '../components/AppContainer';
import Circle from '../components/Circle';

export default function Home() {
  return (
    <AppContainer>
      <h1 className="app-title">
        Jenny Wang
      </h1>
      <p className="app-description">
        Jenny Jiayi Wang is a rising sophomore at Carnegie Mellon University.
        <br />
        She studies Architecture, with special interests in interior design.
        <br />
        <br />
        <Link to="/contact">Contact</Link>
      </p>
      <Circle
        imageSrc="/home/archie.jpg"
        title="Projects"
        description="Coming Soon"
        link="/projects"
        readonly
      />
      <Circle
        imageSrc="/home/tower.jpg"
        title="Photography"
        description="Coming Soon"
        link="/photography"
        readonly
      />
      <Circle
        imageSrc="/home/model.jpg"
        title="Modeling"
        description="Photos of Jenny"
        link="/modeling"
      />
    </AppContainer>
  );
}
