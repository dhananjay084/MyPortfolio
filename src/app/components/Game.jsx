'use client';
import { useState, useEffect } from 'react';
const MemoryCardGame = ({id}) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const cardIcons = [
    '🍎', '🍌', '🍓', '🍉', '🍒', '🍍', '🍓', '🍎', '🍌', '🍉', '🍍', '🍒'
  ];

  // Shuffle the cards
  const shuffleCards = (cardsArray) => {
    return cardsArray
      .map((card) => ({ value: card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
  };

  // Initialize the game
  const startGame = () => {
    const shuffledCards = shuffleCards(cardIcons);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setGameOver(false);
  };

  useEffect(() => {
    startGame(); // Start the game when the component is mounted
  }, []);

  // Handle flipping cards
  const handleCardClick = (card) => {
    if (gameOver || flippedCards.length === 2 || flippedCards.includes(card) || matchedCards.includes(card)) return;

    setFlippedCards((prev) => [...prev, card]);

    // Check if two cards are flipped
    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];
      const secondCard = card;

      if (firstCard.value === secondCard.value) {
        // If the cards match, add them to matched cards
        setMatchedCards((prev) => [...prev, firstCard, secondCard]);
        setFlippedCards([]); // Clear flipped cards after match
      } else {
        // If they don't match, reset flipped cards after delay
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  // Check if the game is over
  useEffect(() => {
    if (cards.length && matchedCards.length === cards.length) {
      setGameOver(true);
    }
  }, [matchedCards, cards]);

  return (
    <section id={id} className="bg-white text-black flex items-center justify-between relative max-w-[90%]  w-full mx-auto rounded-lg shadow-lg my-4">
      <div className='mx-auto'>
      <div className="w-full text-center p-6">
        <h2 className="text-4xl font-bold">Memory Card Game</h2>
        <p className="text-lg mt-2">Find all matching pairs!</p>
        <button
          onClick={startGame}
          className="bg-white text-black border-2 border-black px-8 py-4 mt-6 rounded-full shadow-xl hover:bg-gray-100 hover:border-gray-700 transition duration-200"
        >
          Restart Game
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 p-6">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(card) || matchedCards.includes(card);
          return (
            <div
              key={index}
              onClick={() => handleCardClick(card)}
              className={`relative w-full h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-32 lg:h-32 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 transform ${
                isFlipped ? 'bg-white border border-gray-300 shadow-lg' : 'bg-[#d5d5d5] shadow-md'
              }`}
              style={{
                perspective: '1000px',
              }}
            >
              {/* Flipped Card */}
              <div
                className={`absolute w-full h-full bg-white rounded-lg flex items-center justify-center text-4xl transition-transform duration-300 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transform: 'rotateY(180deg)',
                }}
              >
                <span className="">{card.value}</span>
              </div>

              {/* Unflipped Card */}
              {!isFlipped && (
                <div className="absolute w-full h-full bg-[#d5d5d5] rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold">?</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Game Over Screen */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center bg-white p-6 rounded-xl shadow-lg border-2 border-[#d5d5d5]">
            <h3 className="text-3xl font-bold text-black">You Win!</h3>
            <p className="text-xl mt-2 text-black">Congratulations, you matched all pairs!</p>
            <button
              onClick={startGame}
              className="bg-white text-black border-2 border-black px-8 py-4 mt-6 rounded-full shadow-xl hover:bg-gray-100 hover:border-gray-700 transition duration-200"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
      </div>
    </section>
  );
};

export default MemoryCardGame;
