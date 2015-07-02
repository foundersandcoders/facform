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
    auth: {
      mode: 'try',
      strategy: 'github'
    },
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
  path: '/dashboard',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    handler: handlers.dashboard
  }

},
{
  method: 'GET',
  path: '/profile',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    handler: handlers.profile
  }
},
{
  method: 'GET',
  path: '/join-challenge',
  config: {
    auth: {
      mode: 'try',
      strategy: 'session'
    },
    handler: handlers.joinChallenge
  }
},
{
  method: 'GET',
  path: '/logout',
  config: {
    auth: false,
    handler: handlers.logout
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
