import React, { Component } from 'react'
import Board from './Board'
import socketIOClient from 'socket.io-client'
var socket = socketIOClient('localhost:3001')

class Game extends Component {

    constructor(props){
      super(props)
      this.sendMove = this.sendMove.bind(this)
      this.joinRoom = this.joinRoom.bind(this)
      this.state = {
        receivedMove : false,
        initPermission: false,
        message: '',
        myIcon: '',
      }
      socket.on('receivedMove', (obj) => {
        this.setState({
          receivedMove: obj.boardArray
        })
      })

      socket.on('serverMessage', (obj) => {
        this.setState({
          ...obj
        })
      })

      socket.on('initPermission', (obj) => {
        this.setState({
          initPermission: true,
          myIcon : obj.yourIcon
        })
      })
    }
    
    sendMove(obj){
      socket.emit('move', { boardArray : obj } )
    }

    joinRoom(e){
      e.preventDefault()
      var roomName = document.getElementById('roomid').value
      socket.emit('roomName', { name: roomName } )
    }

    render(){
        return (
          <div className="game">
        { !this.state.gameActive &&  <form action="#" onSubmit={this.joinRoom}>
              <div>Create an arena and invite your friend to join. Or join an already created arena.</div>
              <input type="text" name="roomid" id="roomid"/>
              <button className="submit-button" type="submit">Create/Join Arena</button>
              <div>{this.state.message}</div>
            </form> }
        { this.state.gameActive && 
          <div className="game-board">
              <p>In this case of a draw, the faster side will be declared the winner. Hurry up!</p>
              <Board sendMove={this.sendMove} 
              receivedMove={this.state.receivedMove} 
              initPermission={this.state.initPermission}
              message={this.state.message}
              myIcon={this.state.myIcon} />
            </div> }
          </div>
        )
      }
}

export default Game