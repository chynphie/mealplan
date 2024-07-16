import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './components/pages/Home'
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import SignUp from "./components/pages/SignUp";
import WorldMap from "./components/WorldMap";
import ReactDOM from "react-dom";
import { ComposableMap, Geographies, Geography, Marker, Annotation, ZoomableGroup} from "react-simple-maps";
import ReactTooltip from 'react-tooltip'

// url to a valid topojson file
const geoUrl =
  "https://unpkg.com/world-atlas@1.1.4/world/110m.json";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/' exact Component={Home} /> */}
          <Route path="/" exact Component={WorldMap} />
          <Route path='/services' exact Component={Services} />
          <Route path='/products' exact Component={Products} />
          <Route path='/sign-up' exact Component={SignUp} />
        </Routes>
      </Router>
    </>
  );
}

export default App
