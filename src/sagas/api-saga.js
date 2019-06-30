import { takeEvery, call, put, all, take } from 'redux-saga/effects'
import { eventChannel } from 'redux-saga'
import openSocket from 'socket.io-client'

export default function* watcherSaga() {
	yield all([
		workerRogerFedererStream(),
	])
}

const socketServerURL = 'http://localhost:3030'
let socket

// Create channel
const createSocketChannel = (socket, tweet)=> eventChannel((emit) => {
	const handler = (data) => {
		emit(data)
	}
	socket.on('tweet', handler);
	return () => {
		socket.off('tweet', handler)
	}
})


// ----------- RogerFederer ------------

function* workerRogerFedererStream() {
	yield takeEvery('DATA_ROGERFEDERER_REQUESTED', listenRogerFederer)
}

// wrapping function for socket.on
const connectRogerFederer = () => {
	if (typeof socket !== 'undefined') {
		socket.disconnect()
	}
	socket = openSocket(socketServerURL + '/rogerfederer')
	return new Promise((resolve) => {
		socket.on('connect', () => {
			resolve(socket)
		})
	})
}

// saga that listens to the socket and puts the new data into the reducer
const listenRogerFederer = function* () {
	// connect to the server
	const socket = yield call(connectRogerFederer)

	// then create a socket channel
	const socketChannel = yield call(createSocketChannel, socket)

	// then put the new data into the reducer
	while (true) {
		const payload = yield take(socketChannel)
		yield put({type: 'DATA_LOADED_TO_ROGERFEDERER', payload})
	}
}
