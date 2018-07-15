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
    socket.on('move', (obj) => {
        socket.broadcast.emit('receivedMove', {boardArray : obj.boardArray})
    })
})