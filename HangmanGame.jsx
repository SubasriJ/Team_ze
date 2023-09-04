import React, { useState, useEffect } from 'react';
import KeyboardFunction from './KeyboardFunction';


const words = [
  { word: 'javascript', clue: 'A scripting language for the web' },
  { word: 'react', clue: 'A JavaScript library for building user interfaces' },
  { word: 'nodejs', clue: 'A runtime environment for executing JavaScript' },

];

const maxWrongAttempts = 6;

const HangmanGame = () => {
  const [selectedWordObj, setSelectedWordObj] = useState({});
  const [guessedWord, setGuessedWord] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWordObj(words[randomIndex]);
    setGuessedWord('_'.repeat(words[randomIndex].word.length));
    setWrongAttempts(0);
  }, []);

  useEffect(() => {
    if (wrongAttempts === maxWrongAttempts) {
      alert('You lost! The word was: ' + selectedWordObj.word);
      resetGame();
    } else if (guessedWord === selectedWordObj.word) {
      alert('Congratulations! You guessed the word: ' + selectedWordObj.word);
      resetGame();
    }
  }, [selectedWordObj, guessedWord, wrongAttempts]);

  const handleGuess = (letter) => {
    if (selectedWordObj.word.includes(letter)) {
      const newGuessedWord = selectedWordObj.word
        .split('')
        .map((char, index) => (char === letter ? letter : guessedWord[index]))
        .join('');
      setGuessedWord(newGuessedWord);
    } else {
      setWrongAttempts(wrongAttempts + 1);
    }
  };

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWordObj(words[randomIndex]);
    setGuessedWord('_'.repeat(words[randomIndex].word.length));
    setWrongAttempts(0);
  };

  const hangmanImage = `images/hangman-${wrongAttempts}.png`;

  return (
    <div className="HangmanGame">
  <h1>Hangman Game</h1>
  <p>Clue: {selectedWordObj.clue}</p>
  <p>Guess the word:</p>
  <p className="GuessedWord">{guessedWord}</p>
  <p className="WrongAttempts">Wrong Attempts: {wrongAttempts}</p>

  {/* Conditionally render the win message with the "WinMessage" class */}
  {guessedWord === selectedWordObj.word && (
    <p className="WinMessage">Congratulations! You guessed the word: {selectedWordObj.word}</p>
  )}

  {/* Conditionally render the fail message with the "FailMessage" class */}
  {wrongAttempts === maxWrongAttempts && (
    <p className="FailMessage">You lost! The word was: {selectedWordObj.word}</p>
  )}

  {/* Button to start a new game */}
  <button onClick={resetGame}>New Game</button>
  <KeyboardFunction onKeyPress={handleGuess} />
</div>
  );
};

export default HangmanGame
