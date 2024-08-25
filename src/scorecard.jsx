import React, { useEffect, useState } from 'react'
import './styles/scorecard.css'
import creator from './img/creator.png'

const Scorecard = ({Plyruns,Cpuscore,toss,batting,wickets,flag}) => {

  
  
  return (
    <div>{!flag && (<a href="https://atharva-deshmukh-23.github.io/portfolio2/">
          <div className="god" > <img src={creator} alt="creator img" /> <p>Creator</p></div>
        </a>)}
      <div className="scorecard">
        <h3>Finger Cricket</h3>
        {!toss && (
        <div className="score">
          {batting?(<div className="plyscore"><h6>Ply </h6><h4>{Plyruns}/{wickets}</h4></div>)
          :(<div className="plyscore"><h6>Cpu </h6><h4>{Cpuscore}/{wickets}</h4></div>)}
           </div>)}
      </div>
    </div>
  )
}

export default Scorecard
