var handlers = require('./handlers.js');

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
	path: '/public/{path*}',
	handler: {
		directory: {
			path: './public'
		}
	}
}
];

module.exports = routes;