import { useState, useEffect } from "react";
import uniqid from "uniqid";
import Confetti from 'react-confetti';
import Die from "./Die";
import AnimatedDie from "./AnimatedDie";
import "./App.css";

function App() {
  const [diceNums, setDiceNums] = useState(generateDiceNums());
  const [tenzies, setTenzies] = useState(false);
  
  useEffect(() => {
    if (diceNums.every(diceNum => diceNum.isHeld === true && 
      diceNum.num === diceNums[0].num)) {
      setTenzies(oldTenzies => !oldTenzies);
    }
  }, [diceNums]);

  function generateDie () {
    return {
      id: uniqid(),
      num: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function generateDiceNums() {
    let diceNumsArray = [];
    for (let i = 0; i < 10; i++) {
      diceNumsArray.push(generateDie());
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
        return dieNum.isHeld ? dieNum : generateDie();
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

  // const dieElements = (
  //   <div className="die-container">
  //     {diceNums.map((dieNum) => {
  //       return <Die num={dieNum.num} isHeld={dieNum.isHeld} holdDie={() => holdDie(dieNum.id)} key={dieNum.id} />;
  //     })}
  //   </div>
  // );

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

        {/* {dieElements} */}
        {animDieElements}

        <button onClick={rollDice} className="roll-dice">
          {!tenzies ? `Roll` : `Play Again`}
        </button>
      </div>
    </div>
  );
}

export default App;
