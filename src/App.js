import React from 'react';
import './App.css';
import { LoadScript } from '@react-google-maps/api';
/* import Home from './pages/Home'; */
import Direction from './pages/Directions';

function App() {
  return (
    <div className="App">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API}>
        <Direction />
      </LoadScript>
    </div>
  );
}

export default App;
