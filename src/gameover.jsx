import React from 'react'

const gameover = ({Plyruns,gamehandler}) => {
  return (
    <div>
        <h5>Your Score {Plyruns}</h5>
      <div className="replay" onClick={ ()=>gamehandler()}>replay</div>
    </div>
  )
}

export default gameover
