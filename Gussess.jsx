import React from 'react';

const Guesses = ({ incorrectGuesses }) => {
  return (
    <div className="guesses">
      <p>Incorrect Guesses: {incorrectGuesses.join(', ')}</p>
    </div>
  );
};

export default Guesses;
