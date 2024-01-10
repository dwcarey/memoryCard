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

    console.log(cardsData);
    return cardsData;
  } catch (error) {
    console.error('Error fetching data:', error.message);
    throw error;
  }
}