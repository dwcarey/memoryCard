import React from 'react';
import './Header.css';

function Header({ currentScore, bestScore }) {
  return (
    <>
      <div className='headerContainer section'>
        <div className='titleContainer'>
          <h1>Memory Card Game</h1>
          <h2>
            Click each card only once, gain one point for each unique card clicked for a maximum of 12!
          </h2>
        </div>
        <div className='scoreContainer'>
          <h2>Current Score: {currentScore}</h2>
          <h2>Best Score: {bestScore}</h2>
        </div>
      </div>
    </>
  );
}

export default Header;
