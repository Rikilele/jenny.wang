/**
 * Node modules
 */
import React from 'react';
import { Route, Switch } from 'react-router-dom';

/**
 * Custom components
 */
import Home from './pages/Home/Home';
import Projects from './pages/Projects/Projects';
import Project from './pages/Project/Project';
import Photography from './pages/Photography/Photography';
import Modeling from './pages/Modeling/Modeling';
import Contact from './pages/Contact/Contact';

/**
 * Styles
 */
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/projects" component={Projects} />
      <Route path="/projects/details/:id" component={Project} />
      <Route path="/photography" component={Photography} />
      <Route path="/modeling" component={Modeling}/>
      <Route path="/contact" component={Contact} />
    </Switch>
  );
}
