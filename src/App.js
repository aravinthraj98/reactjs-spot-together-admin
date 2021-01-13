import { useState } from 'react';
import firebase, { storage } from './firebase';
import Routing from './router/router';
const database = firebase.database();

function App() {
  return <Routing />;
}

export default App;
