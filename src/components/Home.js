import {React, useState} from 'react';



export const Home = () => {
     
    const [Switch, setSwitch] = useState(null)
    const [conditon, setCondition] = useState(true)
    const [color, setColor] = useState('lime')
    let fakeDuration =  120;
    const [Countdown, setCount] = useState(`${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}` )
   
       
      
    
    function Beach (){
        if(!Switch){
            document.querySelector('.vid-container video').src='./video/beach.mp4';
            document.getElementById('song').src='./sounds/beach.mp3';
            Start()
            setSwitch('v')
        } 
    }
    function Rain (){
       
        if(Switch){
        document.querySelector('.vid-container video').src='./video/rain.mp4';
        document.getElementById('song').src='./sounds/rain.mp3';
        Start()
        setSwitch(null)
        }
    }
    function Reset(){
            document.getElementById('play').src='https://vinod-brs.github.io/Meditation/assets/svg/play.svg';
            document.querySelector('.vid-container video').pause()
            document.getElementById('song').pause()
            document.getElementById('song').currentTime = 0;
    }
    
    function count (){
        document.querySelector(".moving-outline circle").style.strokeDashoffset = document.querySelector(".moving-outline circle").getTotalLength();
        document.querySelector(".moving-outline circle").style.strokeDasharray = document.querySelector(".moving-outline circle").getTotalLength();
        setCondition(false)
        document.getElementById('song').ontimeupdate = function() {
            let currentTime = document.getElementById('song').currentTime;
            let elapsed = fakeDuration - currentTime;
            let seconds = Math.floor(elapsed % 60);
            let minutes = Math.floor(elapsed / 60);
            setCount(`${minutes}:${seconds}`);

            let progress = document.querySelector(".moving-outline circle").getTotalLength() - (currentTime / fakeDuration) * document.querySelector(".moving-outline circle").getTotalLength();
            document.querySelector(".moving-outline circle").style.strokeDashoffset = progress;
           
            
            if (currentTime >= fakeDuration ) {
                Reset()
                setColor('lime')
            }else if ((currentTime >= fakeDuration - 31) && (currentTime <= fakeDuration - 16)){
                setColor('orange')
            }else if (currentTime >= fakeDuration - 21){
                setColor('red')
            }
          };
    }

    function Timer(e){
        fakeDuration = e.target.value;
        Reset()
        count()
        Start()
    }

    function Start(){
        setColor('lime')
         
        if(document.querySelector('.vid-container video').paused){
            document.querySelector('.vid-container video').play()
            document.getElementById('song').play()
            document.getElementById('play').src='https://vinod-brs.github.io/Meditation/assets/svg/pause.svg';
        if(conditon){
            setCondition(false)
            count()
            
        }
            
           
        }else{
            document.getElementById('play').src='https://vinod-brs.github.io/Meditation/assets/svg/play.svg';
            document.querySelector('.vid-container video').pause()
            document.getElementById('song').pause()
            
        }
        
    }
    

    return(
        <>
            <main role="main" className="pt-0">
            <div className="app ">
            <div className="vid-container bg-info">
                <video loop>
                    <source src="./video/rain.mp4" type="video/mp4" />
                </video>
            </div>

                <div className="time-select">
                    <button onClick={Timer} value="120">2 Minutes</button>
                    <button onClick={Timer} value="300" className="medium-mins">5 Minutes</button>
                    <button onClick={Timer} value="600" className="long-mins">10 Minutes</button>
                </div>
                <div className="player-container">
                    <audio loop id='song' className="song">
                        <source src="./sounds/rain.mp3" />
                    </audio>
                    <img src="https://vinod-brs.github.io/Meditation/assets/svg/play.svg" id='play' onClick={Start}  alt="" />
                    <svg className="track-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="226.5" cy="226.5" r="216.5" stroke="white" strokeWidth="20"/>
                    </svg>
                    <svg className="moving-outline" width="453" height="453" viewBox="0 0 453 453" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="226.5" cy="226.5" r="216.5" stroke={color} strokeWidth="12"/>
                    </svg>
                    <img onClick={Reset} src="https://vinod-brs.github.io/Meditation/assets/svg/replay.svg" alt='' className="replay position-absolute bottom-0" />
                    <h3  className="time-display">{Countdown}</h3>
                </div>
                <div className="sound-picker">
                    <button onClick={Rain}  ><img src="https://vinod-brs.github.io/Meditation/assets/svg/rain.svg" alt="" /></button>
                    <button onClick={Beach} ><img src="https://vinod-brs.github.io/Meditation/assets/svg/beach.svg" alt="" /></button>
                </div>
            </div>
        </main>
        
        
        </>
    )
}