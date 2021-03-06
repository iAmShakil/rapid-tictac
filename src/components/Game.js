import React, { Component } from 'react'
import Board from './Board'
import socketIOClient from 'socket.io-client'
import { setTimeout } from 'timers';
var socket = socketIOClient('localhost:3001')

class Game extends Component {

    constructor(props){
      super(props)
      this.sendMove = this.sendMove.bind(this)
      this.joinRoom = this.joinRoom.bind(this)
      this.timeSender = this.timeSender.bind(this)
      this.state = {
        receivedMove : false,
        initPermission: false,
        message: '',
        myIcon: '',
        drawResult: '',
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

      socket.on('drawResult', (obj) => {
        console.log("result check", obj.result, this.state.myIcon);
        if(obj.result === this.state.myIcon || this.state.myIcon === '' && obj.result === 'O' ){
          window.totalWon++
          alert("You won by time");
          this.setState({
            receivedMove: Array(9).fill(null)
          })
        } else if (obj.result) {
          window.totalLost++
          alert("You lost by time");
          this.setState({
              receivedMove: Array(9).fill(null)
          })
        } else {
          console.log('something went wrong');
        }
      })
      
    }
    
    sendMove(obj){
      socket.emit('move', { boardArray : obj } )
    }

    joinRoom(e){
      e.preventDefault()
      var roomName = document.getElementById('roomid').value
      if(roomName){
        socket.emit('roomName', { name: roomName } )
      } else {
        alert("Please enter a valid input")
      }
    }
    
    timeSender(timeObj){
      socket.emit('time', timeObj )
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
              timeSender={this.timeSender} 
              receivedMove={this.state.receivedMove} 
              initPermission={this.state.initPermission}
              message={this.state.message}
              myIcon={this.state.myIcon}
               />
            </div> }
          </div>
        )
      }
}

export default Game