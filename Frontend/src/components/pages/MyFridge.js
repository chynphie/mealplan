import React, { useState, useEffect } from 'react';
import './MyFridge.css';
import Accordion from 'react-bootstrap/Accordion';

const MyFridge = () => {
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [fridgeItems, setFridgeItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState({
    fruits: true,
    meats: true,
    vegetables: true,
  });

  // get the external api for food category
  const getFoodCategory = async (foodName) => {
    const apiKey = '3ff7c255ca646f62bcbe74bc5987f59d'; // Replace with your actual API key
    const appId = '800b89c9'; // Replace with your actual App ID
    const apiUrl = `https://trackapi.nutritionix.com/v2/search/instant/?query=${foodName}`;
    console.log(foodName, apiUrl);
    
    try {
      const response = await fetch(apiUrl, {
        headers: {
          "x-app-id": appId,
          "x-app-key": apiKey,
          "Content-Type": "application/json",
        }
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      console.log('food data from external api', data);
      const category = data.common[0].serving_unit; // Extract food category
      const unit = data.common[0].serving_qty
      return category;

    } catch (error) {
      console.error('Error fetching food data:', error);
    }
  };
  
  useEffect(() => {
    fetch('http://localhost:8081/my_fridge')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        setFridgeItems(data); // Set the fetched data to fridgeItems
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddItem = async () => {
    const category = await getFoodCategory(foodName);
    console.log(category);
    
    const myData = {
      name: foodName,
      unit: 'g',
      quantity: amount,
      category: 'fruits',
    };
    console.log(JSON.stringify(myData));
    
    try {
      const result = await fetch('http://localhost:8081/my_fridge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myData)
      });
  
      const resultInJson = await result.json(); // Parse response as JSON
  
      // Update the state with the new fridge item
      setFridgeItems(prev => [...prev, resultInJson]);
      
      console.log('Response:', resultInJson); // Handle the result here
    } catch (error) {
      console.error('Error submitting fridge item:', error);
    }
  };
    
  const toggleCategory = (category) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category],
    }));
  };

  // const debounce = (func, delay) => {
  //   let timfeoutId;
  //   return (...args) => {
  //     if (timeoutId) {
  //       clearTimeout(timeoutId);
  //     }
  //     timeoutId = setTimeout(() => {
  //       func(...args);
  //     }, delay);
  //   };
  // };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setFoodName(value);
    fetchSuggestions(value); // Call directly
  };

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]); // Clear suggestions if input is empty
      return;
    }    
    const apiKey = '3ff7c255ca646f62bcbe74bc5987f59d'; // Replace with your actual API key
    const appId = '800b89c9'; // Replace with your actual App ID
    const apiUrl = `https://trackapi.nutritionix.com/v2/search/instant/?query=${input}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          "x-app-id": appId,
          "x-app-key": apiKey,
          "Content-Type": "application/json",
        }
        
      });
      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const suggestions = Array.isArray(data.common) ? data.common.map((hint) => hint.food_name) : [];  // Extract food names for suggestions
      
      setSuggestions(suggestions);
    } catch (error) {
      console.error('Error fetching food suggestions:', error);
    }
  };

  return (
    <div className="container">
      {/* Form */}
      <div className="form">
        <div className="input-group">
          <div>
            <input
              type="text"
              placeholder="Enter the food here"
              value={foodName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Enter the amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleAddItem}>Add to your fridge</button>
          </div>
        </div>
      </div>
      <div className="suggestions">
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion-item"
              onClick={() => {
                setFoodName(suggestion); // Set the food name to the selected suggestion
                setSuggestions([]); // Clear suggestions after selection
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Display fridge contents */}
      <h2>Your fridge:</h2>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Fruits</Accordion.Header>
            <Accordion.Body>
            <ul>
              {fridgeItems
                .filter((item) => item.category === "fruits")
                .map((item) => {
                  // console.log(item);
                  return (
                    <li key={item.id}>
                      {item.food_name}, {item.quantity} {item.unit}
                    </li>
                  );
                })}
            </ul>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header>Meats</Accordion.Header>
            <Accordion.Body>
            <ul>
              {fridgeItems
                .filter((item) => item.category === "meat")
                .map((item) => {
                  // console.log(item);
                  return (
                    <li key={item.id}>
                      {item.food_name}, {item.quantity} {item.unit}
                    </li>
                  );
                })}
            </ul>
            </Accordion.Body>
        </Accordion.Item>

      <Accordion.Item eventKey="2">
        <Accordion.Header>Vegetables</Accordion.Header>
          <Accordion.Body>
            <ul>
              {fridgeItems
                .filter((item) => item.category === "vegetables")
                .map((item) => (
                  <li key={item.id}>
                    {item.food_name}, {item.quantity} {item.unit}
                  </li>
                ))}
            </ul>
            </Accordion.Body>
        </Accordion.Item>
      </Accordion>

    </div>
  );
};

export default MyFridge;
