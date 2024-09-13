import React, { useState } from 'react';
import Scorecard from './scorecard';
import Game from './game';
import Gameover from './gameover';
import Toss from './toss';
import Preloader from './Preloader';
import './styles/app.css';
import celebration4 from './video/celebration42.mp4';
import celebration6 from './video/celebration61.mp4';
import lighting from './video/lightning.mp4';

const App = () => {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [toss, setToss] = useState(true);
  const [plyscore, setplyscore] = useState(0);
  const [cpuruns, setCpuruns] = useState();
  const [cpuscore, setCpuscore] = useState(0);
  const [flag, setFlag] = useState(true);
  const [batting, setbatting] = useState('');
  const [inning, setinning] = useState(1);
  const [iscelebration, setiscelebration] = useState(0);
  const [isnewgame, setisnewgame] = useState(false);
  const [wickets, setWickets] = useState(0);

  const isbatting = (action) => {
    setbatting(action);
  };
  const tosshandler = () => {
    setTimeout(tosshandler1, 2000);
  };
  const tosshandler1 = () => {
    setToss(false);
  };
  const inninghandler = () => {
    const currentinning = setinning(inning - 1);
    if (inning === 0) {
      setTimeout(() => {
        setFlag(false);
      }, 2000);
    } else {
      setbatting(!batting);
    }
  };
  const scorehandler = (bat) => {
    if (batting) {
      runshandler(bat);
    } else {
      cpurunshandler(bat);
    }
  };
  const runshandler = (bat) => {
    const newcpuruns = cpuscorehandler();
    if (bat === newcpuruns) {
      wickethandler();
    } else {
      setplyscore(plyscore + bat);
    }
  };
  const cpurunshandler = (bat) => {
    const newcpuruns = cpuscorehandler();
    if (newcpuruns === bat) {
      wickethandler();
    } else {
      setCpuscore(cpuscore + newcpuruns);
    }
  };
  const wickethandler = () => {
    if (wickets === 1) {
      inninghandler();
      setWickets(0);
    } else {
      setWickets(wickets + 1);
    }
  };
  const cpuscorehandler = () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    setCpuruns(numbers[randomIndex]);
    return numbers[randomIndex];
  };
  const gamehandler = () => {
    setisnewgame(true);
    setinning(1);
    setFlag(true);
    setToss(true);
    setplyscore(0);
    setCpuscore(0);
    setCpuruns(0);
  };

  return (
    <div className={`${!toss ? 'main1' : 'main'} ${iscelebration === 6 ? 'celebration' : ''}`}>
      {!loadingComplete ? (
        <Preloader onLoadingComplete={() => setLoadingComplete(true)} />
      ) : (
        <div className="video-container">
          {iscelebration === 6 && (
            <video className="background-video" autoPlay muted loop>
              <source src={celebration6} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {iscelebration === 5 && (
            <video className="background-video" autoPlay muted loop>
              <source src={lighting} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {iscelebration === 4 && (
            <video className="background-celebration4-video" autoPlay muted loop>
              <source src={celebration4} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <Scorecard Plyruns={plyscore} Cpuscore={cpuscore} toss={toss} batting={batting} wickets={wickets} flag={flag} />
          {toss ? (
            <Toss tosshandler={tosshandler} isbatting={isbatting} />
          ) : (
            flag ? (
              <Game Plyruns={plyscore} Cpuruns={cpuruns} scorehandler={scorehandler} inning={inning} batting={batting} cpuscore={cpuscore} plyscore={plyscore} inninghandler={inninghandler} setiscelebration={setiscelebration} cpuscorehandler={cpuscorehandler} isnewgame={isnewgame} wickets={wickets} />
            ) : (
              <Gameover Plyruns={plyscore} gamehandler={gamehandler} cpuscore={cpuscore} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
