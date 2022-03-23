import { useState, useEffect } from "react";
import uniqid from "uniqid";
import Confetti from 'react-confetti';
import NumDie from "./NumDie";
import AnimatedDie from "./AnimatedDie";
import "./App.css";
import "./Die.css"

function App() {
  const [diceNums, setDiceNums] = useState(generateDiceNums());
  const [tenzies, setTenzies] = useState(false);
  const [gameMode, setGameMode] = useState(null);
  const [diceElements, setDiceElements] = useState(null);

  useEffect(() => {
    if (diceNums.every(diceNum => diceNum.isHeld === true && 
      diceNum.num === diceNums[0].num)) {
      setTenzies(oldTenzies => !oldTenzies);
    }
    if(gameMode === "numbers") {
      setDiceElements(numDieElements);
    }
    else if(gameMode === "dots") {
      setDiceElements(animDieElements);
    }
  }, [diceNums, gameMode]);

  function generateDieDetails () {
    return {
      id: uniqid(),
      num: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function generateDiceNums() {
    let diceNumsArray = [];
    for (let i = 0; i < 10; i++) {
      diceNumsArray.push(generateDieDetails());
    }
    return diceNumsArray;
  }

  function rollDice(e) {
    if (tenzies) {
      setDiceNums(generateDiceNums()); 
      setTenzies(false);
    }
    else {
      setDiceNums(prevDiceNums => prevDiceNums.map(dieNum => {
        return dieNum.isHeld ? dieNum : generateDieDetails();
      }))  
    }

    e.target.blur();
  }

  function holdDie(id) {
    setDiceNums(prevDiceNums => prevDiceNums.map(dieNum => {
      return (
        dieNum.id === id ? {
          ...dieNum, isHeld: !dieNum.isHeld
        } : 
        dieNum
      )
    })
  )}

  function selectMode(e) {
    const mode = document.querySelector("#gameMode").checked;
    if (mode === true) {
      setGameMode("dots")
    } else {
      setGameMode("numbers")
    }
  }

  const chooseGameMode = (
    <div className="game-mode">
      <p>Choose your game mode</p>
      <input type="checkbox" id="gameMode" />
      <label htmlFor="gameMode">
        <span className="number" role="button" title="This will select numbers as die faces">1</span> 
        <span className="die" role="button" title="This will select dots as die faces">&#127922;</span>
      </label>
      <button className="set-mode" onClick={selectMode}>Set mode</button>
    </div>
  )

  const numDieElements = (
    <div className="die-container">
      {diceNums.map((dieNum) => {
        return <NumDie num={dieNum.num} isHeld={dieNum.isHeld} holdDie={() => holdDie(dieNum.id)} key={dieNum.id} />;
      })}
    </div>
  );

  const animDieElements = (
    <div className="die-container">
      {diceNums.map((dieNum) => {
        return <AnimatedDie num={dieNum.num} isHeld={dieNum.isHeld} holdDie={() => holdDie(dieNum.id)} key={dieNum.id} />;
      })}
    </div>
  );

  return (
    <div className="tenzies-app">
      <div className="tenzies-container">
        {tenzies && <Confetti />}

        <h1 className="tenzies-heading">Tenzies</h1>
        <p className="tenzies-intro">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>

        {!gameMode && chooseGameMode}
        {gameMode && diceElements}

        {gameMode && 
          <button onClick={rollDice} className="roll-dice">
            {!tenzies ? `Roll` : `Play Again`}
          </button>
        }
      </div>
    </div>
  );
}

export default App;
