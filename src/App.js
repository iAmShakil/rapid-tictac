import React, { Component } from 'react'
import Game from './components/Game'
import './assets/styles/foundation.css'
import './assets/styles/main.css'

class App extends Component {
  render() {
    return (
      <div>
        <p>If there's no winner, the faster one is declared winner. So hurry up!</p>
        <Game />
      </div>
    )
  }
}

export default App