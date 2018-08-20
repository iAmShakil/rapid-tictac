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
          xIsNext: true,
          isMyMove: false,
          message: this.props.message,
          myIcon: this.props.myIcon || 'O',
        }
      }

      // componentDidMount(){
      //   if(this.props.message){
      //     this.setState({
      //       message: this.props.message
      //     })
      //   }
      //   if(this.props.myIcon){
      //     this.setState({
      //       myIcon: this.props.myIcon
      //     })
      //   }
      // }

      componentWillReceiveProps(nextProps){

        if(nextProps.message){
          this.setState({
            message: nextProps.message
          })
        }
        if(nextProps.initPermission){
          this.setState({
            isMyMove: true
          })
        }
        if(nextProps.myIcon){
          this.setState({
            myIcon: nextProps.myIcon
          })
        }

        if(nextProps.receivedMove){
          console.log('boards props received', this.props.receivedMove)
          this.setState({
            squares: nextProps.receivedMove,
            xIsNext: !this.state.xIsNext, // switching who's next
            isMyMove: true // allowing to click upon receiving a move
          })
        } else {
          console.log(`receivedMove didn't receive`)
        }
      }
      handleClick(i){
        // preventing from doing anything if the block is not empty
        // and there's already a winner
        if (this.state.squares[i] !== null || calculateWinner(this.state.squares) || !this.state.isMyMove ) return
        // creating a copy of the current state, mutating the current state and rerendering the UI
        const squares = this.state.squares.slice()

        // if it's X's turn we place X in the array's position and if
        // it's O's turn, we do the same.
        this.state.xIsNext? squares[i] = 'X': squares[i] = 'O'
        // broadcasting the changes
        this.props.sendMove(squares)

        // rendering the changes
        this.setState(
          { squares: squares,
            xIsNext: !this.state.xIsNext,
            isMyMove: false}
          )
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
          this.status = `Next move: ${nextPlayer}`
        }
    
        return (
          <div>
            <div>{this.state.isMyMove ? 'Your turn!' : 'waiting for turn...' }</div>
            <div className="status">{this.status}</div>
            <div>{`your icon is ${this.state.myIcon}`}</div>
            <div className="message"> {this.state.message} </div>
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