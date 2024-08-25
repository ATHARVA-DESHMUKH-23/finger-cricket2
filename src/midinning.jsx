import React from "react";
import './styles/midinning.css'
import buttonsound from './audios/buttonclick.mp3'
const Midinning=({cpuscore,plyscore,matchStatus,batting,midinninghandler})=>{
    const click = new Audio(buttonsound)
    return(

        <div className="midinning">
            {batting ? (<div className="content1">
                <h4>CPU Score {cpuscore} runs</h4>
                <h4>{matchStatus}</h4>
                <button className="play" onClick={()=>{click.play();midinninghandler()}}>continue</button>
            </div>)
            :
            (<div className="content1">
                <h4>You score {plyscore} runs</h4>
                <h4>{matchStatus}</h4>
                <button className="play" onClick={()=>{click.play();midinninghandler()}}>continue</button>
            </div>)}
        </div>
    )
}
export default Midinning;
