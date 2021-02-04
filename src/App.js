import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.scss";

let timer = null;
//this soundBank is from https://codepen.io/freeCodeCamp/pen/MJyNMd all rights reserved
const soundJSON = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];
class DrumMachine extends React.Component {
  //default 'App'

  render() {
    return (
      <div className="container">
        <div className="container">
          <div className="row">
            <DrumSet />
          </div>
        </div>
      </div>
    );
  }
}

class DrumSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      display: "screen d-none",
    };
    this.setDisplay = this.setDisplay.bind(this);
  }

  setDisplay(arg) {
    clearTimeout(timer);
    timer = setTimeout(
      () =>
        this.setState({
          text: arg,
          display: "screen d-none",
        }),
      1000
    );
    this.setState({
      text: arg,
      display: "screen",
    });
  }

  render() {
    let drumSet = soundJSON.map((obj, i) => {
      return (
        <DrumPad
          keyCode={obj.keyCode}
          keyTrigger={obj.keyTrigger}
          src={obj.url}
          text={obj.id}
          display={this.setDisplay}
          key={obj.id}
        />
      );
    });
    return (
      <>
        <div className="col-md-7 " id="drum-container">
          <div className="row">{drumSet}</div>
        </div>
        <Display display={this.state.display} text={this.state.text} />
      </>
    );
  }
}

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPress);
  }
  onKeyPress(event) {
    if (event.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0; //to prevent non-repeating
    try {
      sound.play();
    } catch {
      console.log("failed to connect server");
    }
    this.props.display(this.props.text);
  }
  render() {
    return (
      <div className="col-md-4 pad-container">
        <div
          className="drum-pad"
          onClick={this.playSound}
          id={this.props.text}
          >
            {this.props.keyTrigger}
          <audio
            className="clip"
            style={{ display: "none" }}
            id={this.props.keyTrigger}
            src={this.props.src}
          ></audio>
        </div>
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div className="col-md-5 p-0 m-0" id="display">
      <div className="screen">
        <span className={props.display}>{props.text}</span>
      </div>
    </div>
  );
};

ReactDOM.render(<DrumMachine />, document.getElementById("drum-machine"));

export default DrumMachine;
