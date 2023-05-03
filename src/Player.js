import { Component } from "react";
import './player.css'

class Player extends Component {
  state = {
    number: this.getRandomNumber(),
    steps: 0,
    gameOver: false,
    active: true
  };

  getRandomNumber() {
    return Math.floor(Math.random() * 100);
  }

  handleOperation = (operation) => {
    let newNumber;
    if (operation === "+1") {
      newNumber = this.state.number + 1;
    } else if (operation === "*-1") {
      newNumber = this.state.number  -1;
    } else if (operation === "*2") {
      newNumber = this.state.number * 2;
    } else if (operation === "/2") {
      newNumber = Math.floor(this.state.number / 2);
    }
    if (newNumber === 100) {
      {
        this.setState((prevState) => ({
          gameOver: true,
          steps: prevState.steps + 1,
        }), () => {
          this.props.onTurnComplete();
        });
      }
    } else {
      this.setState((prevState) => ({
        number: newNumber,
        steps: prevState.steps + 1,
      }), () => {
        this.props.onTurnComplete();
      });
    }
  };

  handleReset = () => {
    let my_score={name: this.props.name , score:this.state.steps}
    this.props.callback(my_score)
    this.setState({
      number: this.getRandomNumber(),
      steps: 0,
      gameOver: false,
    });
  };

  handleLeaveGame = () => {
    this.setState({
      active: false
    });
    this.props.onLeaveGame(this.props.name);
  };

  render() {
    const { number, steps, gameOver, active } = this.state;

    return (
      active ? (
        <div className="game">
          {gameOver ? (
            <div>
              <p>Well done!! You reached 100 in {steps} steps!</p>
              <button onClick={this.handleReset}>Start a game</button>
              <button onClick={this.handleLeaveGame}>quit</button>
            </div>
          ) : (
            <div>
              <p class="name-bold">{this.props.name}</p>
              <p>Number: {number}</p>
              <p>Steps: {steps}</p>
              <button
  onClick={() => this.handleOperation("+1")}
  disabled={!this.props.isActive}
>
  +1
</button>
<button
  onClick={() => this.handleOperation("*-1")}
  disabled={!this.props.isActive}
>
  -1
</button>
<button
  onClick={() => this.handleOperation("*2")}
  disabled={!this.props.isActive}
>
  *2
</button>
<button
  onClick={() => this.handleOperation("/2")}
  disabled={!this.props.isActive}
>
  /2
</button>

              <button onClick={this.handleLeaveGame}>quit</button>
            </div>
          )}
        </div>
      ) : null
    );
  }
}

export default Player;
