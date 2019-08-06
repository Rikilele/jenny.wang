import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Project from './pages/Project';
import Photography from './pages/Photography';
import Modeling from './pages/Modeling';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/projects" component={Projects} />
        <Route path="/projects/details/:id" component={Project} />
        <Route path="/photography" component={Photography} />
        <Route path="/modeling" component={Modeling} />
      </Switch>
      <footer className="footer">
        <nav className="footer-nav">
          <a href='mailto:jiayiw3@andrew.cmu.edu'>Contact Jenny</a>
        </nav>
      </footer>
    </div>
  );
}
