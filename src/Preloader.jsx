import React, { useState, useEffect } from "react";
import './styles/preloader.css';
import applogo from './img/applogo.jpeg';
import finger0 from './img/fingers/0.jpg';
import finger1 from './img/fingers/1.jpg';
import finger2 from './img/fingers/2.jpg';
import finger3 from './img/fingers/3.jpg';
import finger4 from './img/fingers/4.jpg';
import finger5 from './img/fingers/5.jpg';
import finger6 from './img/fingers/6.jpg';
import Heads from './img/coin.png';
import Tails from './img/cointail.png';
import Six from './img/6.png';
import Four from './img/4.png';
import Ten from './img/anniversary.png';
import Wicket from './img/wicket.png';
import plyface from './img/playerface.png'
import robotface from './img/robotface.png'
import drinksbrake from './img/brinksbrakebg.jpeg'
import tossbackground from './img/toss-background.jpeg'
import grass from './img/grass.jpg'
import winnertrophy from "./img/winner1.jpeg";
import lossertrophy from "./img/losser.jpeg";
import stadium from './img/stadium.jpg';
import stadium1 from './img/stadium2.jpg';
import stadium2 from './img/stadium1.jpg';


import coinTossVideo from './video/coinflip.mp4';
import celebration4 from './video/celebration42.mp4';
import celebration6 from './video/celebration61.mp4';
import lighting from './video/lightning.mp4';

import cointossaudio from './audios/toss.m4a';
import buttonaudio from './audios/buttonclick2.mp3';
import background from './audios/background.m4a';
import startaudio1 from './audios/matchstart.m4a';
import six1 from './audios/six1.m4a';
import six2 from './audios/six2.m4a';
import four1 from './audios/four1.m4a';
import four2 from './audios/four2.m4a';
import random1 from './audios/random1.m4a';
import random2 from './audios/random2.m4a';
import random3 from './audios/random3.m4a';
import wicket1 from './audios/wicket1.m4a';
import wicket2 from './audios/wicket2.m4a';
import wicket3 from './audios/wicket3.m4a';
import wicket4 from './audios/wicket4.m4a';
import wicketsound from './audios/wicketsound.mp3';
import silent from './audios/silent.m4a';
import clapping1 from './audios/clapping.m4a';
import shot1 from './audios/shot.m4a';
import shot2 from './audios/shotsix.m4a';
import lose from './audios/lose.m4a';
import win from './audios/win.m4a';

const Preloader = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const images = [
      finger0, finger1, finger2, finger3, finger4, finger5, finger6,
      Heads, Tails,stadium, stadium1, stadium2,Six,Four,Ten,Wicket,plyface,
      robotface,drinksbrake,tossbackground,grass,winnertrophy,lossertrophy
    ];
    const audios = [
      six1, six2, four1, four2, random1, random2, random3, 
      wicket1, wicket2, wicket3, wicket4, wicketsound, silent, 
      clapping1, shot1, shot2, cointossaudio, buttonaudio, 
      background, startaudio1,win,lose
    ];
    const videos = [celebration4, celebration6, lighting,coinTossVideo];

    const totalAssets = images.length + audios.length + videos.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets += 1;
      setLoadingProgress(Math.round((loadedAssets / totalAssets) * 100));
      if (loadedAssets === totalAssets) {
        onLoadingComplete();
      }
    };

    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = updateProgress;
    });

    videos.forEach((src) => {
      const video = document.createElement('video');
      video.src = src;
      video.onloadeddata = updateProgress;
    });

    audios.forEach((src) => {
      const audio = new Audio();
      audio.src = src;
      audio.onloadeddata = updateProgress;
    });
  }, [onLoadingComplete]);

  return (
    <div className="preloader">
      <div className="preloadercontent">
        <img src={applogo} alt="applogo" />
        <h1>Loading... {loadingProgress}%</h1>
      </div>
    </div>
  );
};

export default Preloader;
