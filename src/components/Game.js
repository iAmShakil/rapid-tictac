import React, { Component } from 'react'
import Board from './Board'
import socketIOClient from 'socket.io-client'
var socket = socketIOClient('localhost:3001')

class Game extends Component {

    constructor(props){
      super(props)
      this.sendMove = this.sendMove.bind(this)
      this.state = {
        receivedMove : false,
        initPermission: false,
        message: ''
      }
      socket.on('receivedMove', (obj) => {
        this.setState({
          receivedMove: obj.boardArray
        })
      })

      socket.on('serverMessage', (obj) => {
        this.setState({
          message: obj.message
        })
      })

      socket.on('initPermission', (obj) => {
        this.setState({
          initPermission: true
        })
      })
    }
    
    sendMove(obj){
      socket.emit('move', { boardArray : obj } )
    }

    render(){
        console.log(this.state.receivedMove)
        return (
          <div className="game">
            <div className="game-board">
              <Board sendMove={this.sendMove} 
              receivedMove={this.state.receivedMove} 
              initPermission={this.state.initPermission}
              message={this.state.message} />
            </div>
          </div>
        )
      }
}

export default Game