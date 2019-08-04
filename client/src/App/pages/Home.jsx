import React from 'react';
import Circle from './components/Circle';

export default function Home() {
  return (
    <div className="app">
      <h1 className="home-title">
        Jenny Wang
      </h1>
      <p className="home-description">
        This is a description of my lovely Jenny Wang.
        <br />
        She is a very nice person, and sometimes can be silly.
        <br />
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
