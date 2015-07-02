var handlers = require('./handlers.js');
var chat = require('./chathandlers.js');


var routes = [
{
	method: 'GET',
	path: '/',
	config: {
		// auth: 'github',
		handler: handlers.displayLanding
	}
},
{
	method: 'GET',
	path: '/login',
	config: {
		auth: 'github',
		handler: handlers.login
	}
},
{
	method: 'GET',
	path: '/chatbox',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: chat.connected
	}
},
{
	method: 'GET',
	path: '/chatroom/{roomNumber}',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: chat.checkExist
	}
},
{
	method: 'GET',
	path: '/newroom/{roomNumber}',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: chat.newRoom
	}
},
{
	method: 'GET',
	path: '/chatbox/{roomNumber}',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: chat.connected
	}
},
{
	method: 'GET',
	path: '/home',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: handlers.home
	}

},
{
	method: 'GET',
	path: '/createroom',
	config: {
		auth: {
			mode: 'try',
			strategy: 'session'
		},
		handler: chat.createRoom
	}

},
{
	method: 'GET',
	path: '/public/{path*}',
	handler: {
		directory: {
			path: './public'
		}
	}
}
];

module.exports = routes;
