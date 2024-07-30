import React from 'react'
import './styles/game.css'

const game = ({Plyruns,Cpuruns,scorehandler}) => {
  return (
    <div>
        <div className="game">
      <div className="cpuside">{Cpuruns}</div>
      <div className="playerside" style={{cursor:'pointer'}}>
        <div className='div'><div className="num" onClick={() => scorehandler(0)}>0</div>
        <div className="num"onClick={()=> scorehandler(1)}>1</div>
        <div className="num"onClick={()=> scorehandler(2)}>2</div>
        </div><div className='div'>
        <div className="num"onClick={()=> scorehandler(3)}>3</div>
        <div className="num"onClick={()=> scorehandler(4)}>4</div>
        <div className="num"onClick={()=> scorehandler(5)}>5</div>
        </div><div className="div">
        <div className="num"onClick={()=> scorehandler(6)}>6</div>
        <div className="num"onClick={()=> scorehandler(10)}>10</div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default game
