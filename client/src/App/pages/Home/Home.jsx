/**
 * Node modules
 */
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Custom components
 */
import AppContainer from '../../components/AppContainer/AppContainer';
import Circle from '../../components/Circle/Circle';
import Padding from '../../components/Padding/Padding';

/**
 * Styles
 */
import './Home.css';

export default function Home() {
  return (
    <AppContainer>
      <Padding />
      <h1 className="home-title">
        Jenny Wang
      </h1>
      <p className="home-description">
        Jenny Wang is a rising sophomore at Carnegie Mellon University.
        <br />
        She studies Architecture with an interest in interior design.
      </p>
      <p className="home-description">
        <Link to="/contact" className="home-link">Contact</Link>
      </p>
      <Circle
        imageSrc="/home/archie.jpg"
        title="Projects"
        description="Coming Soon"
        link="/projects"
      />
      <Circle
        imageSrc="/home/tower.jpg"
        title="Photography"
        description="Coming Soon"
        link="/photography"
      />
      <Circle
        imageSrc="/home/model.jpg"
        title="Modeling"
        description="Photos of Jenny"
        link="/modeling"
      />
      <Padding />
    </AppContainer>
  );
}
