import React from 'react';
import './GameOverPopup.css';

function GameOverPopup({ resetGame, lastClickedCardName, lastClickedCardImageURL }) {
    return (
      <>
        <div className='overlay'></div>
        <div className='gameOverPopup'>
          <h2>Game Over!</h2>
          {lastClickedCardName && (
            <>
              <h3>Defeated by a {lastClickedCardName}!</h3>
              <img src={lastClickedCardImageURL + '/high.webp'} alt={lastClickedCardName} />
            </>
          )}
          <button onClick={resetGame}>Play Again?</button>
        </div>
      </>
    );
  }

export default GameOverPopup;