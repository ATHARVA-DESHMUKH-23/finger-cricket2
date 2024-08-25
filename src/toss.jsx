import React, { useState } from 'react';
import './styles/toss.css';
import Heads from './img/coin.png';
import Tails from './img/cointail.png';
import coinTossVideo from './video/coinflip.mp4';
import cointossaudio from './audios/toss.m4a';
import buttonaudio from './audios/buttonclick2.mp3'
import background from './audios/background.m4a'
import startaudio1 from './audios/matchstart.m4a'
import startaudio2 from './audios/matchstart2.m4a'
import Tutorial from './tutorial';


const CoinToss = ({ tosshandler, isbatting }) => {
  const [step, setStep] = useState('chooseSide'); // 'chooseSide' or 'chooseAction'
  const [result, setResult] = useState('');
  const [winner, setWinner] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [tossDone, setTossDone] = useState(false);
  const [tossready, settossready] = useState(false);
  const [tutorial,settutorial] = useState(false)
  const tossaudio = new Audio(cointossaudio);
  const buttonclickaudio = new Audio(buttonaudio);
  const backgroundaudio = new Audio(background);
  const matchstart1 = new Audio(startaudio1);
  backgroundaudio.loop = true;
  backgroundaudio.volume = 0.2;
  
  const bgaudiohandler=()=>{
    backgroundaudio.pause()
    backgroundaudio.volume=0;
  }
  // Ready for toss
  const readyhandler = () => {
    settutorial(true);

  };
  const tutorialHandler=()=>{
    settossready(true);
    settutorial(false);

  }

  // Simulate a coin toss
  const tossCoin = () => {
    const outcomes = ['heads', 'tails'];
    const randomOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
    return randomOutcome;
  };

  const handleUserChoice = (choice) => {
    const coinResult = tossCoin();
    setShowVideo(true);
    setTimeout(() => {
      setTossDone(true);
      setResult(coinResult);
      setShowVideo(false);
      if (choice === coinResult) {
        setWinner('You win!');
        setStep('chooseAction');
      } else {
        setWinner('You lose! Opponent wants to bat');
        isbatting(false);
      }
    }, 1000); // Adjust the delay to match the length of your video
  };

  const play = () => {
    backgroundaudio.play()
    matchstart1.play();
    tosshandler();
  };

  const handleActionChoice = (action) => {
    backgroundaudio.play()
    matchstart1.play();
    isbatting(action);
    tosshandler();
  };

  return (
    <div className='toss'>
      <div className="content">
        {!tossready && !tutorial && (
          <div className='tossing'>
            <h1>Welcome to finger cricket!</h1>
            <div className="option">
              <button onClick={()=>{buttonclickaudio.play(); readyhandler()}}>1 player</button>
              <button onClick={()=>{buttonclickaudio.play(); readyhandler()}}>1 vs 1</button>
              <button onClick={()=>{buttonclickaudio.play(); readyhandler()}}>2 vs 2</button>
            </div>
          </div>
        )}{
          tutorial  && (
            <Tutorial tutorialHandler={tutorialHandler}/>
          )
        }
        {tossready && (
          <div className='tossing'>
            <h1>Coin Toss</h1>
            {step === 'chooseSide' && !tossDone && (
              <div className='coinchoice'>
                {showVideo ? (
                  <video id='coinvideo' autoPlay loop>
                    <source src={coinTossVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className="coinimg">
                    <img src={result === 'heads' ? Heads : Tails} alt={result} />
                  </div>
                )}
                <div className='choicebutton'>
                  <button onClick={() =>{tossaudio.play(); handleUserChoice('heads')}}>Heads</button>
                  <button onClick={() => {tossaudio.play(); handleUserChoice('tails')}}>Tails</button>
                </div>
              </div>
            )}
          </div>
        )}
        {tossDone && !showVideo && result && (
          <div className='result'>
            <p>Coin landed on: {result}</p>
            <img src={result === 'heads' ? Tails : Heads} alt={result} />
            <p>{winner}</p>
            {winner === 'You lose! Opponent wants to bat' && (<button onClick={()=>{buttonclickaudio.play(); play()}}>Play</button>)}
          </div>
        )}
        {step === 'chooseAction' && !showVideo && (
          <div className="coinchoice">
            <p>CHOOSE</p>
            <div className='choicebutton'>
              <button onClick={() =>{buttonclickaudio.play(0); handleActionChoice(true)}}>Bat</button>
              <button onClick={() =>{buttonclickaudio.play(0); handleActionChoice(false)}}>Bowl</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoinToss;
