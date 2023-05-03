import {Route, Switch } from 'react-router-dom';
import './App.css';
import { Component } from 'react';
import Login from './Login';
import GameBoard from './GameBoard';



class App extends Component{
render(){
  return(
    <div className='App'>
     <h1>Get to 100 !!</h1>
      <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/game" component={GameBoard} />
      </Switch>
    </div>
  )
}

}
export default App;