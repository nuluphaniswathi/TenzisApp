import "./App.css";
import { Die } from "./components/Die";
import { nanoid } from "nanoid";
import React, { useState,useRef, useEffect } from "react";
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
function App() {
  
  const { width, height } = useWindowSize()
  const [dice, setDice] = useState(() => generateAllNewDice());
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value);
  const buttonRef = useRef(null);
  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus();
    }
  },[gameWon]);
  function generateAllNewDice() {
    
    return new Array(10).fill(0).map(() => ({
      // value: 6,
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  const dieElements = dice.map((dieObj) => (
    <Die key={dieObj.id} 
         value={dieObj.value} 
         isHeld={dieObj.isHeld}
         hold={() => hold(dieObj.id)}
    />
  ));
  function rollDice() {
    if(gameWon){
      setDice(generateAllNewDice());
    }
    setDice(oldDice => oldDice.map(die => 
      die.isHeld === true ? die : {...die, value:Math.ceil(Math.random() * 6)}
    ));
  }
  function hold(id){
    setDice(oldDice =>  oldDice.map(diceObj => (diceObj.id === id ? {...diceObj, isHeld: !diceObj.isHeld} : diceObj)
      )
    )
  }

  return (
    <main>
    {gameWon &&  <Confetti
      width={width}
      height={height}
    />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">{dieElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
       {gameWon ? "Start New Game" : "Roll"} 
      </button>
    </main>
  );
}

export default App;
