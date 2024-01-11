const apiUrl = 'https://api.tcgdex.net/v2/en/sets/base1';

export async function fetchData() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const cardsData = data.cards.map(card => ({
      cardName: card.name,
      imageURL: card.image,
    }));

    // Select the first 69 elements (only the pokemon..)
    const first69slice = cardsData.slice(0, 69);

    // Shuffle the array
    const shuffledCardsData = shuffleArray(first69slice);

    // Select the first 12 elements
    const selectedCards = shuffledCardsData.slice(0, 12);

    console.log(selectedCards);
    return selectedCards;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}