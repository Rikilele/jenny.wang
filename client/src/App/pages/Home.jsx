import React from 'react';
import Circle from './components/Circle';

export default function Home() {
  return (
    <div className="app">
      <h1 className="home-title">
        Jenny Wang
      </h1>
      <p className="home-description">
        Jenny Jiayi Wang is a rising sophomore at Carnegie Mellon University.
        <br />
        She studies Architecture, with special interests in interior design.
        <br />
        <br />
        <a href="/contact">Contact</a>
      </p>
      <Circle
        imageSrc="/home/archie.jpg"
        title="Projects"
        description="Architecture portfolio"
        link="/projects"
      />
      <Circle
        imageSrc="/home/tower.jpg"
        title="Photography"
        description="Taken by Jenny"
        link="/photography"
      />
      <Circle
        imageSrc="/home/model.jpg"
        title="Modeling"
        description="Photos of Jenny"
        link="/modeling"
      />
    </div>
  );
}
