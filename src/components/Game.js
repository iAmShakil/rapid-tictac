import React, { Component } from 'react'
import Board from './Board'

class Game extends Component {

    constructor(props){
      super(props)
      this.gameStateAdder = this.gameStateAdder.bind(this)
      this.state = {
        history: []
      }
    }

    gameStateAdder(state){
      this.state.history.push(state)
    }

    render() {
      var history = [null,
        null,
        null,
        "X",
        "O",
        "X",
        "O",
        "X",
        null]
        return (
          <div className="game">
            <div className="game-board">
              <Board adder={this.gameStateAdder} />
            </div>
          </div>
        )
      }
}

export default Game