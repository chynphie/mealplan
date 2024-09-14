import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyFridge.css';

const MyFridge = () => {
  const [foodName, setFoodName] = useState('');
  const [amount, setAmount] = useState('');
  const [fridgeItems, setFridgeItems] = useState([]);
  const [expanded, setExpanded] = useState({
    fruits: true,
    meats: true,
    vegetables: true,
  });

  useEffect(() => {
    fetchFridgeItems();
  }, []);

  const fetchFridgeItems = async () => {
    try {
      const response = await axios.get('/api/fridge');
      setFridgeItems(response.data);
      console.log(response);
      
    } catch (error) {
      console.error('Error fetching fridge items', error);
    }
  };
  console.log('here~');
  
  const handleAddItem = async () => {
    const newItem = { foodName, amount };
    try {
      await axios.post('/api/fridge', newItem);
      fetchFridgeItems(); 
    } catch (error) {
      console.error('Error adding item', error);
    }
    setFoodName('');
    setAmount('');
  };

  const toggleCategory = (category) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [category]: !prevExpanded[category],
    }));
  };

  return (
    <div className="container">
      
      {/* Form */}
      <div className="form">
        <div className="input-group">
          {/* <span className="input-icon"></span> You can use icons or emojis here */}
          <input
            type="text"
            placeholder="Enter the food here"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
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

      {/* Display fridge contents */}
      <h2>Your fridge:</h2>
      <div className="collapsible">
        <h2 onClick={() => toggleCategory('fruits')}>
          <span className="arrow">{expanded.fruits ? '▼  ' : '▶  '}</span>
          Fruits
        </h2>
        <div className={`collapsible-content ${expanded.fruits ? 'open' : ''}`}>
          <ul>
            {fridgeItems
              .filter((item) => item.category === 'fruits')
              .map((item) => (
                <li key={item.id}>
                  {item.name}, {item.quantity} {item.unit}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="collapsible">
        <h2 onClick={() => toggleCategory('meats')}>
          <span className="arrow">{expanded.meats ? '▼ ' : '▶ '}</span>
          Meats
        </h2>
        <div className={`collapsible-content ${expanded.meats ? 'open' : ''}`}>
          <ul>
            {fridgeItems
              .filter((item) => item.category === 'meats')
              .map((item) => (
                <li key={item.id}>
                  {item.name}, {item.quantity} {item.unit}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="collapsible">
        <h2 onClick={() => toggleCategory('vegetables')}>
          <span className="arrow">{expanded.vegetables ? '▼ ' : '▶ '}</span>
          Vegetables
        </h2>
        <div className={`collapsible-content ${expanded.vegetables ? 'open' : ''}`}>
          <ul>
            {fridgeItems
              .filter((item) => item.category === 'vegetables')
              .map((item) => (
                <li key={item.id}>
                  {item.name}, {item.quantity} {item.unit}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyFridge;
