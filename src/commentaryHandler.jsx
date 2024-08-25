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
import matchstart1 from './audios/matchstart.m4a';
import matchstart2 from './audios/matchstart2.m4a';
import wicketsound from './audios/wicketsound.mp3';
import silent from './audios/silent.m4a';
import clapping1 from './audios/clapping.m4a'
import clapping2 from './audios/clapping2.m4a'
import shot1 from './audios/shot.m4a'
import shot2 from './audios/shotsix.m4a'
const six = [six1, six2];
const four = [four1, four2, silent];
const random = [random1, silent, silent, random2, silent, random3, silent, silent, silent, silent];
const wicket = [wicket1, wicket2, wicket3, wicket4];
const matchstart = [matchstart1, matchstart2];
const clapping = new Audio(clapping1);

export function commentaryHandler(batting, cpuruns, num, setiscelebration,match_status) {
    console.log("Commentary handler called");
    console.log('cpuruns', cpuruns);

    if (batting) {
        if (num === cpuruns) {
            playWicketAudio();
        } else {
            playScoreAudio(num, setiscelebration);
        }
    } else {
        if (num === cpuruns) {
            playWicketAudio();
        } else {
            playScoreAudio(cpuruns, setiscelebration);
        }
    }
    if(match_status==="YOU WON!"){
        celebrationhandler6(setiscelebration)
    }
}


function playShotAudio() {
    const shot = new Audio(shot1);
    shot.currentTime = 0.1;
    shot.play();
}

function playSixshotAudio() {
    const shotSix = new Audio(shot2);
    shotSix.currentTime = 0.1;
    shotSix.play();
}

function playWicketAudio() {
    const randomIndex = Math.floor(Math.random() * wicket.length);
    const wicketsfx = new Audio(wicketsound);
    wicketsfx.currentTime = 0;

    wicketsfx.play().then(() => {
        setTimeout(() => {
            const wicketaudio = new Audio(wicket[randomIndex]);
            wicketaudio.currentTime = 0;
            wicketaudio.play();
        }, 500);
    }).catch(error => console.error("Wicket sound failed to play:", error));
}

function playScoreAudio(score, setiscelebration) {
    if (score > 0 && score < 4) {
        playShotAudio();
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * random.length);
            const randomaudio = new Audio(random[randomIndex]);
            randomaudio.currentTime = 0;
            randomaudio.play().catch(error => console.error("Random sound failed to play:", error));
        }, 300);
    } else if (score < 6) {
        playShotAudio();
        setTimeout(() => {
            if (score===4){
            celebrationhandler4(setiscelebration);}
            else{celebrationhandler5(setiscelebration)}
            playClappingAudio();
            const randomIndex = Math.floor(Math.random() * four.length);
            const fouraudio = new Audio(four[randomIndex]);
            fouraudio.currentTime = 0;
            fouraudio.play().catch(error => console.error("Four sound failed to play:", error));
            
        }, 500);
    } else if (score === 6) {
        playSixshotAudio();
        
        setTimeout(() => {
            celebrationhandler6(setiscelebration);
            playClappingAudio();
            const randomIndex = Math.floor(Math.random() * six.length);
            const sixaudio = new Audio(six[randomIndex]);
            sixaudio.currentTime = 0;
            sixaudio.play().catch(error => console.error("Six sound failed to play:", error));
        }, 500);
    }
}

function playClappingAudio() {
    clapping.currentTime = 0;
    clapping.play().catch(error => console.error("Clapping sound failed to play:", error));
}

function celebrationhandler6(setiscelebration) {
    setiscelebration(6);
    setTimeout(() => {
        setiscelebration(0)
    }, 3200);
}
function celebrationhandler5(setiscelebration) {
    setiscelebration(5);
    setTimeout(() => {
        setiscelebration(0)
    }, 3200);
}
function celebrationhandler4(setiscelebration) {
    setiscelebration(4);
    setTimeout(() => {
        setiscelebration(0)
    }, 3200);
}
