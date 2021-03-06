import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App/App';
import { registerServiceWorker } from './serviceWorker';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
registerServiceWorker();
