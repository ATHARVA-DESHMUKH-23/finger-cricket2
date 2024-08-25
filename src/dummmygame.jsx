import React, { useState, useEffect } from 'react';
import './styles/game.css';
import Six from './img/6.png';
import Four from './img/4.png';
import Ten from './img/anniversary.png';
import Wicket from './img/wicket.png';
import f0 from './img/fingers/0.jpg'
import { fingerUpdate } from './fingerimg';
import { commentaryHandler } from './commentaryHandler';


const Dummygame = ({ Plyruns, Cpuruns, scorehandler, inning, batting, cpuscore, plyscore, inninghandler, celebrationhandler }) => {
  const [shot, setShot] = useState();
  const [shotimg, setShotimg] = useState('');
  const [nextball, setNextball] = useState(true);
  const [name, setName] = useState("num");
  const [matchStatus, setMatchStatus] = useState('');
  const [Cpufingers, setCpufingers] = useState(f0);
  const [Plyfinger, setPlyfinger] = useState(f0);
  const [Shake, setShake] = useState("noshake");
  const [Shakeright, setShakeright] = useState("noshake");
  const [balls, setBalls] = useState([]);
  const [ball,setball] = useState(0);
  const [overs,setovers] = useState(0);

  useEffect(() => {
    if (batting) {

      if (inning === 1) {
        setMatchStatus("You are batting");
      } else if (plyscore > cpuscore) {
        setMatchStatus('YOU WON!');
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
        
        setTimeout(() => {
          inninghandler();
        }, 2000);
      } else {
        setMatchStatus(`CPU needs ${plyscore + 1 - cpuscore} runs to win`);
      }
    }
  }, [ball,batting, inning, cpuscore, plyscore]);
  useEffect(() => {
    if (shot === Cpuruns){
      setBalls((prevBalls) => [...prevBalls, 'w']);
    }
    else if (batting && shot !== undefined) {
      setBalls((prevBalls) => [...prevBalls, shot]);
    } else if (!batting  && Cpuruns!==0) {
      setBalls((prevBalls) => [...prevBalls, Cpuruns]);
    }
    console.log(balls);
    console.log(ball)


    if (balls.length === 6) {
      setTimeout(() =>{setovers(overs+1); setBalls([])}, 2000); 
    }
  }, [ball,shot, batting]);

  
  useEffect(() => {
    setTimeout(() => {
      
      console.log('ue', Cpuruns)
      if (shot === Cpuruns) {
        setBalls([]);
        setovers(0);
        setShotimg(Wicket);
      } else { batting ? shotImgHandler(shot) : shotImgHandler(Cpuruns) };

      fingerUpdate(Cpuruns, setCpufingers);
      fingerUpdate(shot, setPlyfinger);
    }, 750);
  }, [shot, Cpuruns]);

  const shotImgHandler = (x) => {
    if (x === 6) {
      setShotimg(Six); console.log('sih', Cpuruns);
      celebrationhandler();
    } else if (x === 4) {
      setShotimg(Four); console.log('sih', Cpuruns);
    } else if (x === 10) {
      setShotimg(Ten); console.log('sih', Cpuruns);
    } else {
      setShotimg('');
    }
  };

  const shothandler = (num) => {
    if (nextball) {
      setball(ball+1);
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
    <div className='match'>
      <div className='match2'>
        <div className="matchprocess"> <div className="over">Overs: {overs}.{balls.length}</div><div className="balls">{balls.map((num, index) => (
  <div className="run" >
    {num}
  </div>
))}</div> </div>
      <div className="match_status">{matchStatus}</div>
      <div className="Dummygame">
        <div className="cpuside"><div className="aura"></div> <div className="face"></div>
          <div className={`cpufinger ${Shake}`}>
            <img src={Cpufingers} alt="Cpufigers" />
          </div>
        </div>
        <div className="shot">
          {shotimg && <img src={shotimg} alt="shot" />}
        </div>
        <div className="playerside" ><div className="aura"></div>
          <div className="plyface">
          </div>
          <div className={`plyfinger ${Shakeright}`}>
            <img src={Plyfinger} alt="plyfinger" />
          </div>

        </div>
        </div>
      </div>
      <div className='choice'>
        {[0, 1, 2, 3, 4, 5, 6, 10].map(num => (
          <div key={num} className={name} onClick={() => shothandler(num)}>{num}</div>
        ))}
      </div>
    </div>
  );
};

export default Dummygame;
