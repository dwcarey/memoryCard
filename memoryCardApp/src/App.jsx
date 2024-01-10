import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './cardsData';

function App() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className='appContainer'>
        <div className='section'>
          <ul>
            {cardsData.map((card, index) => (
              <li key={index} className='cardsList'>
                <img src={card.imageURL + '/high.webp'} alt={card.cardName} className='cardImage'/>
                <h3 className=''>{card.cardName}</h3>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;