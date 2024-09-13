import React from 'react'
import coin from './img/cointail.png'
import ten from './img/6.png'
import wicket from './img/wicket.png'
import './styles/tutorial.css'
import buttonaudio from './audios/buttonclick2.mp3'


    const buttonc = new Audio(buttonaudio)


const Tutorial = ({tutorialHandler}) => {
    return (
        <div className='tutorial'>
            <div className="tutorial_content">
                <h3>HOW TO PLAY</h3>
                <div className="para1">TOSS a coin! <br/>Decide if you want to Bat or Ball. <img src={coin} alt="coin img" /></div>
                <h4 className='h4'>batting</h4>
                <div className="para2"><img src={ten} alt="" /> Pick a shot by choosing between 1-6 (your runs).
                    The CPU bowls by picking its own number. <br/>
                    If the numbers match, you're out—one wicket down!<br/>
                    You have two wickets, so keep scoring until you're out twice.
                </div>
                <h4 className='h4'>bowling</h4>

                <div className="para3">Choose your delivery (1-6) to bowl.
                    The CPU picks a number to bat.<br/>
                    Get the CPU out twice before it racks up runs. <img src={wicket} alt="" />
                </div>
                <div className="para4">The player with the most runs after both innings wins.</div>
                <div className="playbuttont">                
                    <button className="play"  onClick={()=>{buttonc.play();tutorialHandler()}}>Start</button>
                </div>
            </div>
        </div>
    )
}

export default Tutorial
