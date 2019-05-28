const express = require('express')
const http = require('http')
const app = express()
const socketio = require('socket.io')
const Filter = require('bad-words')

const port = process.env.PORT || 3000
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static('public'))



io.on('connection', (socket) => {
	console.log('new web socket connection');

	socket.emit('message', 'welcome')
	socket.broadcast.emit('message', 'A new user has jointed')

	socket.on('sendMessage', (message, callback) => {
		const filter = new Filter

		if (filter.isProfane(message)) {
			return callback('Profanity is not allowed')
		}
		io.emit('message', message)
		callback()
	})

	socket.on('disconnect', () => {
		io.emit('message', 'A user has left')
	})

	socket.on('sendLocation', (location, callback) => {
		io.emit('message', `User is located at https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`)
		callback()
	})
})



server.listen(port, () => {
	console.log(`Server is listening on port ${port}`);
})
