import React from 'react';
import './styles/gameover.css';
import winnertrophy from "./img/winner1.jpeg";
import lossertrophy from "./img/losser.jpeg";

const Gameover = ({ Plyruns, gamehandler, matchStatus,cpuscore }) => {
  console.log(matchStatus)
  return (
    <div className='outer'>
      <div className="gameover">
        {Plyruns>cpuscore ? (
          <img src={winnertrophy} alt="Winner Trophy" />
          
        ) : (
          <img src={lossertrophy} alt="Loser Trophy" />
        )}
        <div className="scores">
          <div className="ply">
            <h2>YOUR SCORE</h2>
            <h2>{Plyruns}</h2>
          </div>
          <div className="cpu">
            <h2>CPU SCORE</h2> 
            <h2>{cpuscore} </h2>
          </div>
        </div>
        <div className='replay'>
        <button className="play" onClick={gamehandler}>Replay</button>
        </div>
      </div>
    </div>
  );
}

export default Gameover;
