var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var { timeCounter } = require('./utils')

const PORT = 3001

server.listen(PORT, function(){
    console.log('the server is listening on ' + PORT)
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

var firstPlayerTime
var secondPlayerTime
var connectedclients
io.on('connection', function(socket){
    var roomName
    socket.on('roomName', (obj) => {
        roomName = obj.name
        socket.join(roomName)
        connectedClients = Object.keys(io.sockets.adapter.rooms[roomName].sockets)
        console.log("**connectedclients", connectedClients)
        if ( connectedClients.length > 1 ) {
            console.log("enough player")
            io.in(roomName).emit('serverMessage', { 
                message: 'Game started!',
                gameActive: true
            })
            socket.broadcast.to(connectedClients[0]).
            emit( 'initPermission', { yourMove: true, yourIcon: 'X' } )

            socket.broadcast.to(connectedClients[1]).
            emit( 'initPermission', { yourMove: false, yourIcon: 'O' } )
        } else {
            console.log("not enoug clients block")
            io.to(roomName).emit('serverMessage', { 
                message: 'Invite your friend to visit this URL and enter the arena name.',
                gameActive: false
            })
        }
    } )

    console.log("no room name")

    socket.on('move', (obj) => {
        socket.broadcast.emit('receivedMove', {boardArray : obj.boardArray})
    })
    socket.on('time', (obj) => {
        if( obj.time.length === 10 ){
            firstPlayerTime = obj.time.slice(0,8)
        } else if (obj.time.length === 8 ){
            secondPlayerTime = obj.time
        }
        if(firstPlayerTime && secondPlayerTime){
            console.log("total time", firstPlayerTime, secondPlayerTime)
            console.log("connected clients", connectedClients);
            if( timeCounter(firstPlayerTime) < timeCounter(secondPlayerTime)){
                io.in(roomName).emit('drawResult', {
                    result: 'X'
                })                
            } else {
                io.in(roomName).emit('drawResult', {
                    result: 'O'
                })
            }
        }
    })
})