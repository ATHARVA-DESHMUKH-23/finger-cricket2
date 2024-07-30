import React from 'react'
import { useState } from 'react'

const toss = () => {
    const [win,setWin]= useState();

  return (
    <div>
      <div className="toss">
        <h2>TOSS</h2>
        <div className="coin"></div>
        <div className="option"></div>
      </div>
    </div>
  )
}

export default toss
