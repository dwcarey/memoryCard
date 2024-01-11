import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Header from './Header.jsx';
import './index.css';

function Main() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const updateScores = (newCurrentScore, newBestScore) => {
    setCurrentScore(newCurrentScore);
    setBestScore(newBestScore);
  };

  return (
    <React.StrictMode>
      <Header currentScore={currentScore} bestScore={bestScore} />
      <App updateScores={updateScores} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
