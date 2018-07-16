var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)

const PORT = 3001

server.listen(PORT, function(){
    console.log('the server is listening on ' + PORT)
})
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
    // returns an array of connected clients
    let connectedClients = Object.keys(io.engine.clients)
    // if there's more than 1 player, first player gets to move
    if ( connectedClients.length > 1 ) {
        io.emit('serverMessage', { 
            message: 'Game started!'
        })
        socket.broadcast.to(connectedClients[0]).
        emit( 'initPermission', { yourMove: true } )
    } else {
        socket.emit('serverMessage', { 
            message: 'Not enough players. Please wait or play against the computer'
        })
    }
    socket.on('move', (obj) => {
        socket.broadcast.emit('receivedMove', {boardArray : obj.boardArray})
    })
})