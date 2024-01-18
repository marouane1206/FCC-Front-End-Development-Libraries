import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: null,
      alarmColor: { color: "white" },
    };
    this.loop = undefined;
    this.audioBeep = React.createRef();
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.startStopTimer = this.startStopTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.clockify = this.clockify.bind(this);
  }

  incrementBreak() {
    if (this.state.breakLength < 60 && this.state.timerState === "stopped") {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength + 1,
      }));
    }
  }

  decrementBreak() {
    if (this.state.breakLength > 1 && this.state.timerState === "stopped") {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength - 1,
      }));
    }
  }

  incrementSession() {
    if (this.state.sessionLength < 60 && this.state.timerState === "stopped") {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength + 1,
        timer: prevState.sessionLength * 60 + 60,
      }));
    }
  }

  decrementSession() {
    if (this.state.sessionLength > 1 && this.state.timerState === "stopped") {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength - 1,
        timer: prevState.sessionLength * 60 - 60,
      }));
    }
  }

  startStopTimer() {
    if (this.state.timerState === "stopped") {
      this.setState({
        timerState: "running",
        intervalID: this.loop,
      });
      this.loop = setInterval(() => this.timerControl(), 1000);
    } else {
      this.setState({ timerState: "stopped" });
      clearInterval(this.loop);
    }
  }

  timerControl() {
    const { timer, timerType, breakLength, sessionLength } = this.state;
    let countdown = timer - 1;
    this.setState({ timer: countdown });
    if (countdown < 0) {
      this.audioBeep.current.play();
      if (timerType === "Session") {
        this.setState({
          timerType: "Break",
          timer: breakLength * 60,
        });
      } else {
        this.setState({
          timerType: "Session",
          timer: sessionLength * 60,
        });
      }
    }
  }

  reset() {
    clearInterval(this.loop);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerState: "stopped",
      timerType: "Session",
      timer: 1500,
      intervalID: null,
      alarmColor: { color: "white" },
    });
    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    const timeLeft = this.clockify(1500);
    document.getElementById("time-left").innerHTML = timeLeft;
  }

  clockify(timer) {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    return `${minutes}:${seconds}`;
  }

  render() {
    const {
      breakLength,
      sessionLength,
      timerState,
      timerType,
      timer,
      alarmColor,
    } = this.state;

    return (
      <div className="pomodoro-clock">
        <div className="header">
          <h1>Pomodoro Clock </h1>
        </div>
        <div className="settings">
          <div id="break-label">
            <p>Break Length</p>
            <div className="controls">
              <button
                id="break-decrement"
                onClick={this.decrementBreak}
                disabled={timerState === "running"}
              >
                -
              </button>
              <span id="break-length">{breakLength}</span>
              <button
                id="break-increment"
                onClick={this.incrementBreak}
                disabled={timerState === "running"}
              >
                +
              </button>
            </div>
          </div>
          <div id="session-label">
            <p>Session Length</p>
            <div className="controls">
              <button
                id="session-decrement"
                onClick={this.decrementSession}
                disabled={timerState === "running"}
              >
                -
              </button>
              <span id="session-length">{sessionLength}</span>
              <button
                id="session-increment"
                onClick={this.incrementSession}
                disabled={timerState === "running"}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="timer">
          <div id="timer-label">
            <p>{timerType}</p>
          </div>
          <div id="time-left">{this.clockify(timer)}</div>
          <div className="controls">
            <button id="start_stop" onClick={this.startStopTimer}>
              {timerState === "stopped" ? "Start" : "Stop"}
            </button>
            <button id="reset" onClick={this.reset}>
              Reset
            </button>
          </div>
        </div>
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
          ref={this.audioBeep}
        />
        <div className="author">
          Designed and Coded by <br />
          <a
            href="https://github.com/marouane1206"
            target="_blank"
            rel="noreferrer"
          >
            Marouane Sanhaji
          </a>
        </div>
      </div>
    );
  }
}

export default App;
