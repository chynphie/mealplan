import React from 'react';

function Favorites({ favorites }) {
  return (
    <div>
      <h2>Your Favorites</h2>
      <ul>
        {favorites.map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>
    </div>
  );
}

export default Favorites;
