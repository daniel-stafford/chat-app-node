const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')

const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))



io.on('connection', (socket) => {
	console.log('new web socket connection');
	socket.emit('message', 'welcome')
	socket.on('sendMessage', (userInput) => {
		io.emit('message', userInput)
	})
})

server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})
