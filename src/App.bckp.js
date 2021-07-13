import React,{Component} from "react"
import Breack from './components/Breack'
import Session from './components/Session'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      left_time: 0,
      sess : 25*60,
      break_timer: 5*60,
      session_timer: 25*60,
      time_on : false,
      onBreak : false,
    };

    this.reset = this.reset.bind(this);
    this.start = this.start.bind(this);
    this.format_time = this.format_time.bind(this);
    this.change_time = this.change_time.bind(this);
    this.format_time2 = this.format_time2.bind(this)
    this.control_time = this.control_time.bind(this)
    this.playBreakSound = this.playBreakSound.bind(this)

  }
  playBreakSound(timer){
    if(timer === 0){
      this.audioBeep.play()
    }
   
  }
 format_time2(time){
  let minutes = Math.floor(time/60);
  return minutes
 }
  format_time(time){
    let minutes = Math.floor(time/60);
    let seconds = time % 60;
    if (minutes < 10 && seconds < 10){
      return "0"+ minutes + ":"+ "0"+ seconds;
    }
    else if(minutes < 10 && seconds >=10){
      return "0"+ minutes + ":"+ seconds;
    }
    else if (minutes >= 10 && seconds >= 10){
      return minutes + ":"+ seconds;
    }
    else{
      return  minutes + ":"+ "0"+ seconds;
    }

  }
  change_time(amount, type){
    if(type == 'break'){
      if( this.state.break_timer <= 60 && amount < 0 ||this.state.break_timer >= 60*60){
        return;
      }
     this.setState((prevState, props)=>({
       break_timer:prevState.break_timer + amount
     }))
    }
    else{
      if(this.state.session_timer <= 60 && amount < 0 ||this.state.session_timer >= 60*60){
        return;
      }
      this.setState((prevState,props)=>({
        session_timer:prevState.session_timer + amount
      }))
      if(!this.state.time_on){
        this.setState({
          sess: this.state.session_timer + amount
        })
      }
    
    }
  }

start(){
  console.log("In Start "+this.state.sess+" "+ this.state.left_time)
}
  reset (){
      this.setState({
        sess : 25*60,
        break_timer: 5*60,
        session_timer: 25*60,
    })
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  control_time(){
   
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime()+ second
    let onBreakVariable = this.state.onBreak

    if(!this.state.time_on){
      let interval = setInterval(()=>{
        date = new Date().getTime();
        if (date > nextDate){
          console.log(this.state.sess-1)
          this.playBreakSound(this.state.sess);
          if(this.state.sess <= 0 && !onBreakVariable){
            onBreakVariable = true
            this.setState({
              onBreak : true,
              sess: this.state.break_timer
            })
            return this.state.break_timer
          }
          else if (this.state.sess <= 0 && onBreakVariable){
            onBreakVariable = false
            this.setState({
              onBreak : false,
              sess: this.state.session_timer
            })
            return this.state.session_timer
          }
          this.setState((prevState, props)=>({
            sess:prevState.sess - 1
          }))
        }
        nextDate = nextDate + second
      },1000);
      localStorage.clear();
      localStorage.setItem("interval-id",interval)
    }
    if(this.state.time_on){
      clearInterval(localStorage.getItem("interval-id"))
    }
    this.setState({
      time_on: !this.state.time_on
    })
  }
  render(){
  return (
    <div className="App">
      <header className="App-header">
       <h1>25 + 5 Clock</h1>
      </header>
      <div>
        <div className="break-label">
          <p id="break-label">Break Length</p>
          <Breack 
          change_time = {this.change_time}
          type={'break'}
          time= {this.state.break_timer}
          format_time= {this.format_time2}
          />
          </div>
        <div className="session-label">
        <p id="session-label" >Session Length</p>
        <Session 
        change_time = {this.change_time}
        type={'session'}
        time= {this.state.session_timer}
        format_time= {this.format_time2}/>
        </div>
      </div>

      <div>
        <p id="timer-label">{this.state.onBreak ? "Break": "Session"}</p>
        <p id="time-left">{this.format_time(this.state.sess)}</p>
      </div>

      <div>
        <button id="start_stop" onClick = {this.control_time}>start/stop</button>
        <button  id="reset" onClick = {this.reset}>reset</button>
        </div>

        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
    </div>
    
  );
  }
}

//export default App;
