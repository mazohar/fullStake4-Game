import React, { Component } from "react";
import "./App.css";
import Player from "./Player";
import Scoreboard from "./Scoreboard";


class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: JSON.parse(localStorage.getItem("players")),
      scores: [],
      playersStatus: {},
      activePlayerIndex: 0,
      isPopupOpen: false,
    };

    
  }

  componentDidMount() {
    // Initialize playersStatus object to all players being open
    const playersStatus = {};
    this.state.players.forEach((player) => {
      playersStatus[player] = true;
    });
    this.setState({ playersStatus });
  }

  updateScore = (data) => {
    this.setState((prevState) => {
      const { name, score } = data;

      // Find the player with the same name as the updated data
      const player = prevState.scores.find((player) => player.name === name);

      // If the player is not in the scores array, add them with their initial score
      if (!player) {
        return {
          scores: [...prevState.scores, { name, history: [{ score }] }],
        };
      }

      // Otherwise, add the new score to the player's history
      const updatedPlayer = {
        ...player,
        history: [...player.history, { score }],
      };
      const updatedScores = prevState.scores.map((p) =>
        p.name === name ? updatedPlayer : p
      );

      return {
        scores: updatedScores,
      };
    });
  };

  handleLeaveGame = (playerName) => {
    this.setState((prevState) => {
      const playersStatus = { ...prevState.playersStatus };
      playersStatus[playerName] = false;
      return { playersStatus };
    });
  };

  handleTurnComplete = () => {
    this.setState((prevState) => ({
      activePlayerIndex: (prevState.activePlayerIndex + 1) % prevState.players.length,
    }));
  };

  handleOpenPopupClick= ()=> {
    this.setState({ isPopupOpen: true });
  }
  handleClosePopup = () => {
    this.setState({ isPopupOpen: false });
  };

  render() {
    return (
      <div>
        
        <div className="game">
          <div className="winer">
            <button onClick={this.handleOpenPopupClick}>
              Show 3 best players
            </button>
          </div>
          
          {/* Render the list of players */}
          {this.state.players.map((player, index) => (
  <div key={index} className="panel">
    {this.state.playersStatus[player] && (
      <Player 
        callback={(data) => this.updateScore(data)}
        name={player}
        onLeaveGame={() => this.handleLeaveGame(player)}
        isActive={index === this.state.activePlayerIndex}
        onTurnComplete={this.handleTurnComplete}
      />
    )}
  </div>
))}

        </div>
  
        <div className="scores-container">
          {/* Render the list of scores */}
          <div className="scores">
            <h2>Scores:</h2>
            {this.state.scores.map((player, index) => (
              <div key={index}>
                <h3>{player.name}</h3>
                <ul>
                  {player.history.map((score, index) => (
                    <li key={index}>{score.score}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
  
          {/* Render the scoreboard with the 3 lowest scores */}
          {/* <Scoreboard scores={this.state.scores} /> */}

          <div className="popup-box">
          {this.state.isPopupOpen && (
            <div className="box">
              <span className="close-icon" onClick={this.handleClosePopup}>
              &#x2718;
              </span>
              <Scoreboard scores={this.state.scores} />
            </div>
          )}
        </div>

        </div>
      </div>
    );
  }
  
  
}
export default GameBoard;
