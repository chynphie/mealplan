import React from 'react';
import './MyFridge.css';

function MyFridge({ handleMyFridge }) {
  return (
    <div >
      <h2>MyFridge Integration</h2>
      <button onClick={handleMyFridge}>Add Ingredients to MyFridge</button>
    </div>
  );
}

export default MyFridge;
