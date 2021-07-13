import React,{Component} from "react"
import SetTimer from './components/SetTimer'
import './App.css';


class App extends Component {
        state = {
          breakCount: 5,
          sessionCount: 25,
          clockCount: 25 * 60,
          currentTimer: 'Session',
          isPlaying: false
        }
      
        constructor(props) {
          super(props);
          this.loop = undefined;
        }
        
        componentWillUnmount() {
          clearInterval(this.loop);
        }
      
        handlePlayPause = () => {
          const { isPlaying } = this.state;
          
          if(isPlaying) {
            clearInterval(this.loop);
            
            this.setState({
              isPlaying: false
            });
          } else {
            this.setState({
              isPlaying: true
            });
      
            this.loop = setInterval(() => {
              const {clockCount,currentTimer,breakCount,sessionCount} = this.state;
              
              if(clockCount === 0) {
                this.setState({
                  currentTimer: (currentTimer === 'Session') ? 'Break' : 'Session',
                  clockCount: (currentTimer === 'Session') ? (breakCount * 60) : (sessionCount * 60)
                });
                
                this.audioBeep .play();
              } else {
                this.setState({
                  clockCount: clockCount - 1
                });
              }
              
            }, 1000);
          }
        }
        
        handleReset = () => {
          this.setState({
            breakCount: 5,
            sessionCount: 25,
            clockCount: 25 * 60,
            currentTimer: 'Session',
            isPlaying: false
          });
          
          clearInterval(this.loop);
          
          this.audioBeep .pause();
          this.audioBeep .currentTime = 0;
        }
      
        format_time = (count) => {
          let minutes = Math.floor(count / 60);
          let seconds = count % 60;
            
          minutes = minutes < 10 ? ('0'+minutes) : minutes;
          seconds = seconds < 10 ? ('0'+seconds) : seconds;
          
          return `${minutes}:${seconds}`;
        }
        
        change_time = (count, timerType) => {
          const {sessionCount,breakCount,isPlaying,currentTimer} = this.state;
          let newCount;
          if(timerType === 'session') {
            newCount = sessionCount + count;
          } else {
            newCount = breakCount + count;
          }
          
          if(newCount > 0 && newCount < 61 && !isPlaying) {
            this.setState({
              [`${timerType}Count`]: newCount
            });
            
            if(currentTimer.toLowerCase() === timerType) {
              this.setState({
                clockCount: newCount * 60
              })
            }
          }
        }
      
        render() {
          const {breakCount,sessionCount,clockCount,currentTimer,isPlaying} = this.state;
          const breakProps = {
            title: 'Break',
            count: breakCount,
            handleDecrease: () => this.change_time(-1, 'break'),
            handleIncrease: () => this.change_time(1, 'break')
          }
          
          const sessionProps = {
            title: 'Session',
            count: sessionCount,
            handleDecrease: () => this.change_time(-1, 'session'),
            handleIncrease: () => this.change_time(1, 'session'),
          }
          
          return (
            <div>
              <div className="flex">
                <SetTimer {...breakProps} />
                <SetTimer {...sessionProps} />
              </div>
              
              <div className="clock-container">
                <h1 id="timer-label">{currentTimer}</h1>
                <span id="time-left">{this.format_time(clockCount)}</span>
                
                
                <div className="flex">
                  <button id="start_stop" onClick={this.handlePlayPause}>
                    <i className={`fas fa-${isPlaying ? 'pause': 'play'}`} />
                  Play/Pause </button>
                  <button id="reset" onClick={this.handleReset}>
                    <i className="fas fa-sync" /> Reset
                  </button>
                </div>
              </div>

        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
        </div>);
        }
}

export default App;