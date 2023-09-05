import React from 'react';

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

const KeyboardFunction = ({ onKeyPress }) => {
  return (
    <div>
      {alphabet.split('').map((letter) => (
        <button key={letter} onClick={() => onKeyPress(letter)}>
          {letter}
        </button>
      ))}
    </div>
  );
};

export default KeyboardFunction;
