import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from './components/Login';
import Nav from './components/nav';
import Views from './components/totalVideos';
import Routing from './router/router';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pas  <Login />on
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
