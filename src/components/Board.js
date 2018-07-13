import React, { Component } from 'react'
import Square from './Square'
import {calculateWinner} from './utils'

class Board extends Component {
    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.status = ''
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true
        }
      }
      
      handleClick(i){
        if (this.state.squares[i] !== null || calculateWinner(this.state.squares)) return
        const squares = this.state.squares.slice()
        this.state.xIsNext? squares[i] = 'X': squares[i] = 'O'
        this.setState(
            { squares: squares,
            xIsNext: !this.state.xIsNext })
      }
      renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={ () => this.handleClick(i) } />;
      }
    
      render() {
        const winner = calculateWinner(this.state.squares)
        if(winner){
          this.status = `the winner is ${winner}`
        } else {
          const nextPlayer = this.state.xIsNext? 'X' : 'O'
          this.status = `the next is ${nextPlayer}`
        }
    
        return (
          <div>
            <div className="status">{this.status}</div>
            <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        )
      }
}

export default Board