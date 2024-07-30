import React from 'react'
import './styles/scorecard.css'

const scorecard = ({Plyruns,Cpuruns}) => {
  return (
    <div>
      <div className="scorecard">
        <h3>Finger Cricket</h3>
        <div className="score">
            <div className="plyscore"><h6>YOUR SCORE</h6><h4>{Plyruns}</h4></div>
        </div>
      </div>
    </div>
  )
}

export default scorecard
