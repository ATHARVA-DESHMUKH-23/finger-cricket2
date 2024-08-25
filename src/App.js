import React from 'react';
import { useState } from 'react';
import Scorecard from './scorecard';
import Game from './game';
import Gameover from './gameover';
import Toss from './toss';
import './styles/app.css';
// import celebartion from './video/celebration.mp4';
import celebration4 from './video/celebration42.mp4'
import celebration6 from './video/celebration61.mp4'
import lighting from './video/lightning.mp4'
// import startingvideo from './video/starting video.mp4'

const App = () => {
  //runs is total where score is current and runs is current for plyr
  const [toss, setToss] = useState(true)
  const [plyscore, setplyscore] = useState(0);
  const [cpuruns, setCpuruns] = useState();
  const [cpuscore, setCpuscore] = useState(0);
  const [flag, setFlag] = useState(true);
  const [batting, setbatting] = useState('');
  const [inning, setinning] = useState(1);
  const [iscelebration, setiscelebration] = useState(0);
  const [isnewgame, setisnewgame] = useState(false);
  const [wickets, setWickets] = useState(0);
  const [showStartingVideo, setShowStartingVideo] = useState(true);



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
    console.log(currentinning);
    if (inning === 0) {
      setTimeout(() => {
        setFlag(false);
      }, 2000);

    }
    else {
      console.log(batting)

      setbatting(!batting);
    }
  };
  const [shot, setShot] = useState(0);
  const scorehandler = (bat) => {
    setShot(bat)
    if (batting === true) {
      console.log('you batting')
      runshandler(bat);
    } else {
      console.log('cpu batting')
      cpurunshandler(bat)
    }
  };

  const runshandler = (bat) => {
    const newcpuruns = cpuscorehandler();
    console.log('runshandler', cpuruns)
    if (bat === newcpuruns) {
      wickethandler();
    } else {
      setplyscore(plyscore + bat);
    }
  };
  const cpurunshandler = (bat) => {
    console.log('cpuscorehandler', cpuruns)

    const newcpuruns = cpuscorehandler();
    if (newcpuruns === bat) {
      wickethandler();
    } else {
      setCpuscore(cpuscore + newcpuruns);
    }
  };
  const wickethandler = () => {
    if (wickets === 1) {

      inninghandler()
      setWickets(0)
    } else {
      setWickets(wickets + 1);
    }
  }
  const cpuscorehandler = () => {
    const numbers = [1,2,3,4,5,6];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    setCpuruns(numbers[randomIndex])
    return (numbers[randomIndex]);
  };
  const gamehandler = () => {
    setisnewgame(true)
    setinning(1);
    setFlag(true);
    setToss(true);
    setplyscore(0);
    setCpuscore(0);
    setCpuruns(0);
  };


  return (
    <div className={`${!toss ? 'main1' : 'main'} ${iscelebration===6 ? 'celebration' : ''}`}>
<div className="video-container">
  {/* {toss & flag & showStartingVideo && (
          <video
            className="background-starting-video"
            autoPlay
            muted
            onEnded={() => setShowStartingVideo(false)}
          >
            <source src={startingvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )} */}
        {/* {toss &&(<video className="background-video" autoPlay muted loop>
    <source src={lighting} type="video/mp4" />
    Your browser does not support the video tag.
  </video>)} */}
  {iscelebration===6 && (
  <video className="background-video" autoPlay muted loop>
    <source src={celebration6} type="video/mp4" />
    Your browser does not support the video tag.
  </video>)}
  {iscelebration===5 && (
  <video className="background-video" autoPlay muted loop>
    <source src={lighting} type="video/mp4" />
    Your browser does not support the video tag.
  </video>)}
  {iscelebration===4 && (
  <video className="background-celebration4-video" autoPlay muted loop>
    <source src={celebration4} type="video/mp4" />
    Your browser does not support the video tag.
  </video>)}
      <Scorecard Plyruns={plyscore} Cpuscore={cpuscore} toss={toss} batting={batting} wickets={wickets} flag={flag}/>
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
    </div>
  )
}

export default App;