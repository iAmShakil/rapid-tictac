import React, { Component } from 'react'
import Square from './Square'
import {calculateWinner, isDraw, getCurrentTime} from './utils'

class Board extends Component {

    constructor(props){
        super(props)
        this.handleClick = this.handleClick.bind(this)
        this.status = ''
        this.totalTime = []
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
          isMyMove: false,
          message: this.props.message,
          myIcon: this.props.myIcon || 'O',
        }
        window.totalWon = 0;
        window.totalLost = 0;
      }

      componentDidMount(){
        if(this.state.isMyMove){
          this.totalTime.push(getCurrentTime())
          console.log("constructor logged", this.totalTime);
        }
      }

      componentDidUpdate(){
        if(this.state.isMyMove){
          this.totalTime.push(getCurrentTime())
          console.log("constructor logged", this.totalTime);
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
        if(this.state.isMyMove){
          this.totalTime.push(getCurrentTime())
        }
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
          if(winner === this.state.myIcon){
            window.totalWon++
            this.status = 'You won! Restarting in 3 seconds!'
          } else {
            window.totalLost++
            this.status = 'You lost. Restarting in 3 seconds!'
          }
          setTimeout(() => {
            this.setState({
              squares: Array(9).fill(null)
            })
          }, 3000);
        } else {
          
          if(isDraw(this.state.squares)) {
            this.status = 'Game drawn. yawn'
            this.props.timeSender({
              time: this.totalTime
            })
          } else {
            const nextPlayer = this.state.xIsNext? 'X' : 'O'
            this.status = `Next move: ${nextPlayer}`
          }
        }
    
        return (
          <div>
            <div>{this.state.isMyMove ? 'Your turn!' : 'Waiting for your turn...' }</div>
            <div className="status">{this.status}</div>
            {/* <div>{`your icon is ${this.state.myIcon}`}</div> */}
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
            <div>
              Total won: {window.totalWon} <br/>
              Total lost: {window.totalLost} 
            </div>
          </div>
        )
      }
}

export default Board