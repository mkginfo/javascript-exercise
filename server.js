'use strict'

const express				= require('express')
const app					= express()
const http					= require('http').createServer(app)
const io					= require('socket.io')(http)
const cors					= require('cors')
const port					= 3030
const env					= process.env.NODE_ENV || 'dev'
const bodyparser			= require('body-parser')
const path					= require('path')
const	apiRoutes			= require('./server/api.js')
const config				= require('./config/config.json')
var Twitter					= require('twitter')

let streamClient = new Twitter({
	consumer_key: config.consumer_key,
	consumer_secret: config.consumer_secret,
	access_token_key: config.access_token_key,
	access_token_secret: config.access_token_secret
})

// Bodyparser
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

// Cors
app.use(cors())

// Routing
app.use('/api', apiRoutes)

// Socket
var rogerfederer = io.of('rogerfederer').on('connection', (socket) => {
	console.log('User connected to Roger Federer')

	let stream1 = streamClient.stream('statuses/filter', {track: 'rogerfederer'})

	stream1.on('data', function(tweet) {
		rogerfederer.emit('tweet', tweet)
	})
	stream1.on('error', function(error) {
		console.log(error)
	})

	socket.on('disconnect', () => {
		stream1.destroy()
		console.log('User disconnected')
	})
});

http.listen(port, () => console.log(`Server listening on port ${port}`))

