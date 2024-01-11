import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './cardsData';
import GameOverPopup from './GameOverPopup';

function App({ updateScores }) {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [showGameOverPopup, setShowGameOverPopup] = useState(false);
  const [lastClickedCardName, setLastClickedCardName] = useState(null);
  const [lastClickedCardImageURL, setLastClickedCardImageURL] = useState(null);
  const [displayGameOverPopup, setDisplayGameOverPopup] = useState(false);



  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData();
        setCardsData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError('Error fetching data. Please try again.');
        setLoading(false);
      }
    };

    fetchDataAndSetState();
  }, []); 

  // Shuffle the cardsData array and re-render
  const shuffleCards = () => {
    setCardsData((prevCards) => {
      const shuffledCards = [...prevCards];
      shuffledCards.sort(() => Math.random() - 0.5);
      return shuffledCards;
    });
  };

  const resetGame = async () => {
    try {
      // Fetch a new set of 12 cards
      const data = await fetchData();
      setCardsData(data);
      // Reset all game-related states
      setCurrentScore(0);
      setBestScore(currentScore > bestScore ? currentScore : bestScore);
      setClickedCards([]);
      shuffleCards();
      // Hide the game over pop-up
      setShowGameOverPopup(false);
      // Reset the flag to show the game over popup
      setDisplayGameOverPopup(false);
    } catch (error) {
      console.error('Error fetching new data:', error.message);
      // Handle the error (e.g., display an error message to the user)
    }
  };

  useEffect(() => {
    if (clickedCards.length === 12) {
      // If all cards are clicked, show the game over pop-up
      setShowGameOverPopup(true);
    }
  }, [clickedCards]);

  useEffect(() => {
    // Call updateScores whenever currentScore or bestScore changes
    updateScores(currentScore, bestScore);
  }, [currentScore, bestScore, updateScores]);

  useEffect(() => {
    if (displayGameOverPopup) {
      // If the displayGameOverPopup flag is set, show the game over pop-up
      setShowGameOverPopup(true);
    }
  }, [displayGameOverPopup]);

  const handleItemClick = (card) => {
    if (clickedCards.includes(card.cardName)) {
      console.log('Game over!');
      // Compare current score to best score
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      // Clear current score
      setCurrentScore(0);
      // Reset the game
      setClickedCards([]);
      setLastClickedCardName(card.cardName);
      setLastClickedCardImageURL(card.imageURL);
      setDisplayGameOverPopup(true);
    } else {
      setLastClickedCardName(card.cardName);
      setLastClickedCardImageURL(card.imageURL);
      // Add the clicked card's name to the clickedCards array
      setClickedCards((prevClickedCards) => [...prevClickedCards, card.cardName]);
      // Increment current score
      if (clickedCards.length === 11) {
        // If only one card is left to click, set the displayGameOverPopup flag
        setDisplayGameOverPopup(true);
      }
      setCurrentScore((prevScore) => {
        const newScore = prevScore + 1;
        // Update scores in the parent component
        updateScores(newScore, bestScore);
        return newScore;
      });
      // Shuffle and re-render the cardsData
      shuffleCards();
    }
  };
  

  return (
    <>
      <div className='appContainer'>
        <div className='section'>
          <ul>
            {cardsData.map((card, index) => (
              <li key={index} className='cardsList' onClick={() => handleItemClick(card)}>
                <img src={card.imageURL + '/high.webp'} alt={card.cardName} className='cardImage'/>
                <h3 className=''>{card.cardName}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showGameOverPopup && (
        <GameOverPopup
          resetGame={resetGame}
          lastClickedCardName={lastClickedCardName}
          lastClickedCardImageURL={lastClickedCardImageURL}
        />
      )}
    </>
  );
}

export default App;