const socket = io()

socket.on('message', (message) => {
	console.log(message);
})

const userForm = document.querySelector('#messageForm')

userForm.addEventListener('submit', (e) => {
	e.preventDefault()
	socket.emit('sendMessage', document.querySelector('input').value)
	userForm.reset()
})
