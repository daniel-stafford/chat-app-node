const socket = io()

//Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
socket.on('message', (message) => {
	console.log(message)
})

$messageForm.addEventListener('submit', (e) => {
	e.preventDefault()
	$messageFormButton.setAttribute('disabled', 'disabled')
	const message = e.target.elements.message.value

	socket.emit('sendMessage', message, (error) => {
		$messageFormButton.removeAttribute('disabled')
		$messageFormInput.value = ''
		$messageFormInput.focus()
		if (error) {
			return console.log('error', error)
		}
		console.log(' message delivered');
	})
})

$locationButton.addEventListener('click', () => {
	if (!navigator.geolocation) {
		return console.log('Geolocation is not supported by your browser.')
	}
	$locationButton.setAttribute('disabled', 'disabled')
	navigator.geolocation.getCurrentPosition((position) => {
		const latitude = position.coords.latitude;
		const longitude = position.coords.longitude;
		const location = {
			latitude,
			longitude
		}
		socket.emit('sendLocation', location, () => {
			$locationButton.removeAttribute('disabled')
			console.log('location shared');
		})

	})
})
