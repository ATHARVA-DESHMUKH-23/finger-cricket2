import React, { useState, useEffect, createContext } from 'react';
import './styles/game.css';
import Six from './img/6.png';
import Four from './img/4.png';
import Ten from './img/anniversary.png';
import Wicket from './img/wicket.png';
import f0 from './img/fingers/0.jpg';
import { fingerUpdate } from './fingerimg';
import { commentaryHandler } from './commentaryHandler';
import Midinning from './midinning';
import lose from './audios/lose.m4a';
import win from './audios/win.m4a';

export const MatchStatusContext = createContext(); // Create the context

const Game = ({ Plyruns, Cpuruns, scorehandler, inning, batting, cpuscore, plyscore, inninghandler, setiscelebration, cpuscorehandler, isnewgame, wickets }) => {
  const [shot, setShot] = useState(0);
  const [shotimg, setShotimg] = useState('');
  const [nextball, setNextball] = useState(true);
  const [name, setName] = useState("num");
  const [matchStatus, setMatchStatus] = useState('');
  const [Cpufingers, setCpufingers] = useState(f0);
  const [Plyfinger, setPlyfinger] = useState(f0);
  const [Shake, setShake] = useState("noshake");
  const [Shakeright, setShakeright] = useState("noshake");
  const [balls, setBalls] = useState([]);
  const [ball, setball] = useState(0);
  const [overs, setovers] = useState(0);
  const [ismidinning, setIsmidinning] = useState(false);
  const winaudio = new Audio(win);
  const loseaudio = new Audio(lose);

  useEffect(() => {
    if (inning === 0) {
      setTimeout(() => {
        setIsmidinning(true);
      }, 2000);
    }
  }, [inning]);

  const midinninghandler = () => {
    setIsmidinning(false);
  };

  // Match status handler
  useEffect(() => {
    console.log('useEffect for match status handler has been called');
    if (batting) {
      if (inning === 1) {
        setMatchStatus("You are batting");
      } else if (plyscore > cpuscore) {
        setMatchStatus('YOU WON!');
        console.log('innings', inning);
        setTimeout(() => {
          inninghandler();
        }, 2000);
      } else {
        setMatchStatus(`You need ${cpuscore + 1 - plyscore} runs to win`);
      }
    } else {
      if (inning === 1) {
        setMatchStatus("You are bowling");
      } else if (plyscore < cpuscore) {
        setMatchStatus('CPU WON!');
        console.log('innings', inning);
        setTimeout(() => {
          inninghandler();
        }, 2000);
      } else {
        setMatchStatus(`CPU needs ${plyscore + 1 - cpuscore} runs to win`);
      }
    }

    if (inning === -1) {
      if (batting === true) {
        if (plyscore < cpuscore) {
          setMatchStatus('YOU LOSE!');
        }
      } else {
        if (plyscore > cpuscore) {
          setMatchStatus('YOU WON!');
        }
      }
    }

  }, [ball, batting, inning, cpuscore, plyscore]);

  // Win and lose audio
  useEffect(() => {
    setTimeout(() => {
      if (matchStatus === 'YOU WON!') {
        winaudio.play();
      } else if (matchStatus === 'YOU LOSE!') {
        loseaudio.play();
      }
    }, 4000);
  }, [matchStatus]);

  // Ball handler
  useEffect(() => {
    console.log('useEffect for ball handler has been called');
    if (shot === 0 || Cpuruns === 0) {
      console.log('sorry developer can’t handle when ball and bat are at zero :)');
    } else if (shot === Cpuruns) {
      setBalls((prevBalls) => [...prevBalls, 'w']);
    } else if (batting && shot !== undefined) {
      setBalls((prevBalls) => [...prevBalls, shot]);
    } else if (!batting && Cpuruns !== 0) {
      setBalls((prevBalls) => [...prevBalls, Cpuruns]);
    }
    console.log('useEffect', balls);
    console.log('useEffect', ball);

    if (balls.length === 5) {
      setTimeout(() => { setovers(overs + 1); setBalls([]); }, 3000);
    }
  }, [ball, shot, batting]);

  // Commentary handler
  useEffect(() => {
    if (shot === 0 || Cpuruns === 0) {
      console.log('sorry developer can’t handle when ball and bat are at zero :)');
    } else {
      commentaryHandler(batting, Cpuruns, shot, setiscelebration, matchStatus);
    }
  }, [batting, Cpuruns, shot]);

  // Shot image handler
  useEffect(() => {
    if (shot === 0 || Cpuruns === 0) {
      console.log('sorry developer can’t handle when ball and bat are at zero :)');
    } else {
      setTimeout(() => {
        console.log('useEffect for shot img handler has been called', 'ue', Cpuruns);
        if (shot === Cpuruns) {
          setBalls([]);
          setovers(0);
          setShotimg(Wicket);
        } else {
          batting ? shotImgHandler(shot) : shotImgHandler(Cpuruns);
        }

        fingerUpdate(Cpuruns, setCpufingers);
        fingerUpdate(shot, setPlyfinger);
      }, 500);
    }
  }, [shot, Cpuruns]);

  const shotImgHandler = (x) => {
    if (x === 6) {
      setShotimg(Six);
      console.log('sih', Cpuruns);
    } else if (x === 4) {
      setShotimg(Four);
      console.log('sih', Cpuruns);
    } else if (x === 10) {
      setShotimg(Ten);
      console.log('sih', Cpuruns);
    } else {
      setShotimg('');
    }
  };

  const shothandler = (num) => {
    if (nextball) {
      setball(ball + 1);
      setShot(num);
      setName("red");
      scorehandler(num);
      setNextball(false);
      setShake("shake");
      setShakeright("shakeright");

      setTimeout(() => {
        setNextball(true);
        setName("num");
        setShotimg('');
        setShake("noShake");
        setShakeright("noShake");
      }, 2000);
    }
  };

  return (
    <MatchStatusContext.Provider value={{ matchStatus }}>
      <div className='match'>
        <div className='match2'>
          <div className="matchprocess">
            <div className="over">Overs: {overs}.{balls.length}</div>
            <div className="balls">
              {balls.map((num, index) => (
                <div className="run" key={index}>
                  {num}
                </div>
              ))}
            </div>
          </div>
          <div className="match_status">{matchStatus}</div>
          {ismidinning ? (
            <Midinning cpuscore={cpuscore} plyscore={plyscore} matchStatus={matchStatus} batting={batting} midinninghandler={midinninghandler} wickets={wickets} />
          ) : (
            <div className="game">
              <div className="cpuside">
                <div className="aura"></div>
                <div className="face"></div>
                <div className={`cpufinger ${Shake}`}>
                  <img src={Cpufingers} alt="Cpufigers" />
                </div>
              </div>
              <div className="shot">
                {shotimg && <img src={shotimg} alt="shot" />}
              </div>
              <div className="playerside">
                <div className="aura"></div>
                <div className="plyface"></div>
                <div className={`plyfinger ${Shakeright}`}>
                  <img src={Plyfinger} alt="plyfinger" />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='choice' style={{ cursor: 'pointer' }}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className={name} onClick={() => { shothandler(num) }}>{num}</div>
          ))}
        </div>
      </div>
    </MatchStatusContext.Provider>
  );
};

export default Game;
