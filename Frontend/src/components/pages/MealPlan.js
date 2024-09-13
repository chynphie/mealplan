import React, { useState } from 'react';
import { format, addDays } from 'date-fns';

function MealPlan({ addFavorite }) {
  const [mealPlan, setMealPlan] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const generateMealPlan = () => {
    setMealPlan(['Meal 1', 'Meal 2', 'Meal 3']);
  };
  const handleDateChange = (days) => {
    setCurrentDate((prevDate) => addDays(prevDate, days));
  };

  return (
    <div>
      <h2>Your Weekly Meal Plan</h2>
      
      <button onClick={generateMealPlan}>Generate Meal Plan</button>
      <ul>
        {mealPlan.map((meal, index) => (
          <li key={index}>
            {meal} 
            <button onClick={() => addFavorite(meal)}>Add to Favorites</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MealPlan;
