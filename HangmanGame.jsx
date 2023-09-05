import React, { useState, useEffect } from 'react';
import KeyboardFunction from './KeyboardFunction';
import './HangmanGame.css'; // Import the CSS file for styling

const words = [
  { word: 'hangman', clue: 'A word-guessing game' },
  { word: 'javascript', clue: 'A popular programming language' },
  { word: 'react', clue: 'A JavaScript library for building user interfaces' },
  { word: 'vite', clue: 'A fast build tool for modern web development' },
  { word: 'programming', clue: 'The act of writing computer programs' },
];
const maxWrongAttempts = 7;

const hangmanStages = [
  `
    -----
    |   |
        |
        |
        |
        |
  `,
  `
    -----
    |   |
    O   |
        |
        |
        |
  `,
  `
    -----
    |   |
    O   |
    |   |
        |
        |
  `,
  `
    -----
    |   |
    O   |
   /|   |
        |
        |
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
        |
        |
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
   /    |
        |
  `,
  `
    -----
    |   |
    O   |
   /|\\  |
   / \\  |
        |
  `,
];

const HangmanGame = () => {
  const [selectedWord, setSelectedWord] = useState('');
  const [guessedWord, setGuessedWord] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWord(words[randomIndex].word);
  }, []);

  useEffect(() => {
    let newGuessedWord = '';
    for (const char of selectedWord) {
      if (guessedWord.includes(char)) {
        newGuessedWord += char;
      } else {
        newGuessedWord += '_';
      }
    }
    setGuessedWord(newGuessedWord);

    if (wrongAttempts === maxWrongAttempts) {
      alert('You lost! The word was: ' + selectedWord);
      resetGame();
    } else if (newGuessedWord === selectedWord) {
      alert('Congratulations! You guessed the word: ' + selectedWord);
      resetGame();
    }
  }, [selectedWord, guessedWord, wrongAttempts]);

  const handleGuess = (letter) => {
    if (selectedWord.includes(letter)) {
      // Correct guess
      setGuessedWord(
        guessedWord
          .split('')
          .map((char, index) =>
            selectedWord[index] === letter ? letter : char
          )
          .join('')
      );
    } else {
      // Incorrect guess
      setWrongAttempts(wrongAttempts + 1);
    }
  };

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setSelectedWord(words[randomIndex].word);
    setGuessedWord('');
    setWrongAttempts(0);
  };

  const getHangmanArt = () => {
    return hangmanStages[wrongAttempts];
  };

  return (
    <div>
      <h1>Hangman Game</h1>
      <div className="hangman-image">
        <pre>{getHangmanArt()}</pre>
      </div>
      <p className="word-clue">Clue: {words.find((w) => w.word === selectedWord)?.clue}</p>
      <p>Guess the word:</p>
      <p>{guessedWord}</p>
      <p>Wrong Attempts: {wrongAttempts}</p>
      <button onClick={resetGame}>New Game</button>
      <KeyboardFunction onKeyPress={handleGuess} />
    </div>
  );
};

export default HangmanGame;
