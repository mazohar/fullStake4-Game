import { Component } from "react";
import './App.css';
import './Login.css';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        players: [],
        player: ""
      };
    }
  
    handleChange = (event) => {
      this.setState({ player: event.target.value });
    };
  
    handleSubmit = (event) => {
      event.preventDefault();
      this.setState((prevState) => ({
        players: [...prevState.players, prevState.player],
        player: ""
      }));
    };
  
    render() {
      return (
        <div>
          
          <form onSubmit={this.handleSubmit} className="form-container">
            <label>
              Add user:  
              <input
                type="text"
                value={this.state.player}
                onChange={this.handleChange}
              />
            </label>
            <ul>
            {this.state.players.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </ul>
            <input type="submit" value="Add me!" />
            <input type="button" value="Start the Game" onClick=
            {
              ()=>{
                window.localStorage.setItem("players", JSON.stringify(this.state.players));
                this.props.history.push("/game")}}/>
          </form>
        </div>
      );
    }
  }
  export default Login;
