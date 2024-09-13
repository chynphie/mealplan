import './App.css';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import MealPlan from './components/pages/MealPlan.js';
import Favorites from './components/pages/Favorites';
import MyFridge from './components/pages/MyFridge';

function App() {
  useEffect(()=> {
    fetch('http://localhost:8081/food')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }, [])
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (meal) => {
    setFavorites([...favorites, meal]);
  };

  const handleMyFridge = () => {
    alert('Ingredients added to MyFridge!');
  };

  return (
    <Router>
      <div>
        <header>
          <h1>Healthy Meal Planner</h1>
          <p>Eat healthy and on time, effortlessly!</p>
          <nav>
            <ul>
              <li><Link to="/meal-plan">Meal Plan</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li><Link to="/MyFridge">MyFridge</Link></li>
            </ul>
          </nav>
        </header>
        <Routes>
          <Route path="/meal-plan" element={<MealPlan addFavorite={addFavorite} />} />
          <Route path="/favorites" element={<Favorites favorites={favorites} />} />
          <Route path="/MyFridge" element={<MyFridge handleMyFridge={handleMyFridge} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;