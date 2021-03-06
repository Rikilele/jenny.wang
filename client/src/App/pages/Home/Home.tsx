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
 * Assets
 */
import archieImg from './archie.jpg';
import modelImg from './model.jpg';
import photographyImg from './photography.jpg';

/**
 * Styles
 */
import './Home.css';

export default function Home() {
  return (
    <AppContainer>
      <h1 className="home-title">
        Jenny Wang
      </h1>
      <p className="home-description">
        Shanghai · Vancouver · Pittsburgh
        <br />
        <br />
        Jenny is in pursuit of her passion for art, photography, and design.
        <br />
        She is currently an architecture student studying at Carnegie Mellon University.
        <br />
        On this website, you&apos;ll discover some of her most recent work.
      </p>
      <p className="home-description">
        <Link to="/contact" className="home-link">Contact</Link>
      </p>
      <Circle
        imageSrc={archieImg}
        title="Projects"
        description="Crafted by Jenny"
        link="/projects"
      />
      <Circle
        imageSrc={photographyImg}
        title="Photography"
        description="Taken by Jenny"
        link="/photography"
      />
      <Circle
        imageSrc={modelImg}
        title="Modeling"
        description="Photos of Jenny"
        link="/modeling"
      />
      <Padding />
    </AppContainer>
  );
}
