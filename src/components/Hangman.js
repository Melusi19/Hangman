import React, { Component } from 'react';
import './Hangman.css';
import { randomWord } from './Words.js';

import state1 from "./hangmandrawings/state1.GIF";
import state2 from "./hangmandrawings/state2.GIF";
import state3 from "./hangmandrawings/state3.GIF";
import state4 from "./hangmandrawings/state4.GIF";
import state5 from "./hangmandrawings/state5.GIF";
import state6 from "./hangmandrawings/state6.GIF";
import state7 from "./hangmandrawings/state7.GIF";
import state8 from "./hangmandrawings/state8.GIF";
import state9 from "./hangmandrawings/state9.GIF";
import state10 from "./hangmandrawings/state10.gif";
import state11 from "./hangmandrawings/state11.GIF";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 11,
    images: [state1, state2, state3, state4, state5, state6, state7, state8, state9, state10, state11]
  }

  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    }
  }

  handleGuess = e => {
    let letter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map(letter => (this.state.guessed.has(letter) ? letter : " _ "));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        class='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }

  resetButton = () => {
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      answer: randomWord()
    });
  }

  render() {
    const gameOver = this.state.mistake >= this.props.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = "You Won!!!"
    }

    if (gameOver) {
      gameStat = "You Lost!!!"
    }

    return (
      <div className="Hangman container">
        <h1 className='text-center'>Hangman</h1>
        <div className="float-right">Wrong Guesses: {this.state.mistake} of {this.props.maxWrong}</div>
        <div className="text-center">
          <img src={this.props.images[this.state.mistake]} alt=""/>
        </div>
        <div className="text-center">
          <p>Guess the name of the console and pc games:</p>
          <p>
            {!gameOver ? this.guessedWord() : this.state.answer}
          </p>
          <p>{gameStat}</p>
          <button className='btn btn-info' onClick={this.resetButton}>Reset</button>
        </div>
      </div>
    )
  }
}

export default Hangman;