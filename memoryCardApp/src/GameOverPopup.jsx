import React from 'react';
import './GameOverPopup.css';

function GameOverPopup({ resetGame, lastClickedCardName, lastClickedCardImageURL, result }) {
  let message = '';

  switch (result) {
    case 'won':
      message = `Winner Winner, Chicken ${lastClickedCardName}`;
      break;
    case 'lost':
      message = `Defeated by a ${lastClickedCardName}!`;
      break;
    default:
      message = 'Game Over!';
  }

  return (
    <>
      <div className='overlay'></div>
      <div className='gameOverPopup'>
        <h2>Game Over!</h2>
        {lastClickedCardName && (
          <>
            <h3>{message}</h3>
            <img src={lastClickedCardImageURL + '/high.webp'} alt={lastClickedCardName} />
          </>
        )}
        <button onClick={resetGame}>Play Again?</button>
      </div>
    </>
  );
}

export default GameOverPopup;