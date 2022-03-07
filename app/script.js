import React from "react";
import { render } from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "off",
      time: 0,
      timer: 0,
    };
  }
  playBell = () => {
    const bell = new Audio("./sounds/bell.wav");
    bell.volume = 0.1;
    bell.play();
  };

  step = () => {
    this.setState({ time: this.state.time - 1 });

    if (this.state.time === 0) {
      this.playBell();
      if (this.state.status === "work") {
        this.setState({ time: 20 });
        this.setState({ status: "rest" });
      } else if (this.state.status === "rest") {
        this.setState({ time: 1200 });
        this.setState({ status: "work" });
      }
    }
  };

  handleClickStart = () => {
    this.setState({
      status: "work",
      timer: setInterval(this.step, 1000),
      time: 1200,
    });
  };

  handleClickStop = () => {
    this.setState({
      status: "off",
      timer: clearInterval(this.state.timer),
      time: 0,
    });
  };

  closeApp = () => {
    window.close();
  };

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    } else minutes;

    if (seconds < 10) {
      seconds = "0" + seconds;
    } else seconds;

    return Math.round(minutes) + ":" + seconds;
  }

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === "off" && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should
              follow the 20/20/20. It means you should to rest your eyes every
              20 minutes for 20 seconds by looking more than 20 feet away.
            </p>
            <p>
              This app will help you track your time and inform you when it's
              time to rest.
            </p>
          </div>
        )}
        {this.state.status === "work" && <img src="./images/work.png" />}
        {this.state.status === "rest" && <img src="./images/rest.png" />}
        {this.state.status !== "off" && (
          <div className="timer">{this.formatTime(this.state.time)}</div>
        )}
        {this.state.status === "off" && (
          <button onClick={this.handleClickStart} className="btn">
            Start
          </button>
        )}
        {this.state.status !== "off" && (
          <button onClick={this.handleClickStop} className="btn">
            Stop
          </button>
        )}
        <button onClick={this.closeApp} className="btn btn-close">
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
