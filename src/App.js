import React from 'react'
import { useState } from 'react'
import Scorecard from './scorecard';
import Game from './game';
import Gameover from './gameover';

const App = () => {
  const [plyruns,setPlyruns]=useState(0);
  const [cpuruns,setCpuruns]=useState(0);
  const [flag,setFlag]=useState(true)
  const scorehandler = (bat)=>{
    
    setTimeout(runshandler(bat), 500);
    
  };

  const runshandler = (bat) => {
    const newcpuruns = cpuscorehandler();
    if (bat === newcpuruns) {
      setFlag(false);
    } else {
      setPlyruns(plyruns + bat);
    }
  };
  const cpuscorehandler=()=>{
    setCpuruns(0);
    const numbers = [0, 1, 2, 3, 4, 5, 6, 10];
    const randomIndex = Math.floor(Math.random() * numbers.length);

    setCpuruns(numbers[randomIndex])
    return (numbers[randomIndex]);
  };
  const gamehandler = ()=>{
    setFlag(true);
    setPlyruns(0);
  };

    return (
    <div>
      <Scorecard Plyruns={plyruns} Cpuruns={cpuruns}/>
      {flag ? <Game Plyruns={plyruns} Cpuruns={cpuruns} scorehandler={scorehandler}/> : <Gameover Plyruns={plyruns}  gamehandler={gamehandler}/>}
    </div>
  )
}

export default App
