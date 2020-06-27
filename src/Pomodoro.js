import React from "react";

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerLength: 1500,
      running: false,
      currentStatus: "Session",
      style: { color: `#000` },
    };
    this.increaseBreak = this.increaseBreak.bind(this);
    this.decreaseBreak = this.decreaseBreak.bind(this);
    this.increaseSession = this.increaseSession.bind(this);
    this.decreaseSession = this.decreaseSession.bind(this);
    this.resetClock = this.resetClock.bind(this);
    this.timeFormat = this.timeFormat.bind(this);
    this.handleTimer = this.handleTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  increaseBreak() {
    if (this.state.breakLength < 60) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength + 1,
      }));
    }
  }
  decreaseBreak() {
    if (this.state.breakLength > 1) {
      this.setState((prevState) => ({
        breakLength: prevState.breakLength - 1,
      }));
    }
  }
  increaseSession() {
    if (this.state.sessionLength < 60) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength + 1,
        timerLength: prevState.timerLength + 60,
      }));
    }
  }
  decreaseSession() {
    if (this.state.sessionLength > 1) {
      this.setState((prevState) => ({
        sessionLength: prevState.sessionLength - 1,
        timerLength: prevState.timerLength - 60,
      }));
    }
  }
  resetClock() {
    let song = document.getElementById("beep");
    clearInterval(this.timer);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      timerLength: 1500,
      running: false,
      currentStatus: "Session",
      style: { color: `#000` },
    });
    song.pause();
    song.currentTime = 0;
  }
  timeFormat() {
    let mins = Math.floor(this.state.timerLength / 60);
    let secs = this.state.timerLength - mins * 60;
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    return mins + ":" + secs;
  }
  handleTimer() {
    const song = document.getElementById("beep");
    if (this.state.timerLength <= 60 && this.state.timerLength >= 0) {
      this.setState({ style: { color: `red` } });
    } else {
      this.setState({ style: { color: `#000` } });
    }
    if (this.state.currentStatus === "Session") {
      if (this.state.timerLength >= 1) {
        this.setState((prevState) => ({
          timerLength: prevState.timerLength - 1,
          running: true,
        }));
      } else if (this.state.timerLength === 0) {
        song.play();
        this.setState({
          running: false,
          timerLength: this.state.breakLength * 60,
          currentStatus: "Break",
        });
      } else {
        this.setState({
          running: false,
        });
      }
    } else if (this.state.currentStatus === "Break") {
      if (this.state.timerLength >= 1) {
        this.setState((prevState) => ({
          timerLength: prevState.timerLength - 1,
          running: true,
        }));
      } else if (this.state.timerLength === 0) {
        song.play();
        this.setState({
          running: false,
          timerLength: this.state.sessionLength * 60,
          currentStatus: "Session",
        });
      } else {
        this.setState({
          running: false,
        });
      }
    }
  }
  startTimer() {
    if (!this.state.running) {
      clearInterval(this.timer);
      this.timer = setInterval(this.handleTimer, 1000);
      this.setState({
        running: true,
      });
    } else {
      clearInterval(this.timer);
      this.setState({
        running: false,
      });
    }
  }
  render() {
    return (
      <div className="container">
        <h1 className="title">Pomodoro Clock</h1>
        <div className="break-session">
          <div className="break">
            <div id="break-label">Break Length</div>
            <div>
              <button id="break-decrement" onClick={this.decreaseBreak}>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/arrow-down-64.png"
                  alt="Decrease Button"
                />
              </button>
              <span id="break-length">{this.state.breakLength}</span>
              <button id="break-increment" onClick={this.increaseBreak}>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/arrow-up-64.png"
                  alt="Increase Button"
                />
              </button>
            </div>
          </div>
          <div className="session">
            <div id="session-label">Session Length</div>
            <div>
              <button id="session-decrement" onClick={this.decreaseSession}>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/arrow-down-64.png"
                  alt="Decrease Button"
                />
              </button>
              <span id="session-length">{this.state.sessionLength}</span>
              <button id="session-increment" onClick={this.increaseSession}>
                <img
                  src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/arrow-up-64.png"
                  alt="Increase Button"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="timer" style={this.state.style}>
          <h3 id="timer-label">{this.state.currentStatus}</h3>
          <h1 id="time-left">{this.timeFormat()}</h1>
        </div>
        <div className="controls">
          <button id="start_stop" onClick={this.startTimer}>
            <img
              src="https://cdn4.iconfinder.com/data/icons/essential-app-2/16/play-pause-music-player-64.png"
              alt="Play/Pause"
            />
          </button>
          <button id="reset" onClick={this.resetClock}>
            <img
              src="https://cdn0.iconfinder.com/data/icons/faticons-2/29/refresh27-64.png"
              alt="Reset"
            />
          </button>
          <audio
            id="beep"
            src="https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg"
          ></audio>
        </div>
      </div>
    );
  }
}

export default Pomodoro;
