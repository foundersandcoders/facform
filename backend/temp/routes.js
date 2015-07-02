var handlers = require('./handlers.js');

var routes = [

	{
		method: 'GET',
		path: '/',
    // config: {
    //   auth: {
    //     mode: "try",
    //     strategy: "github"
    //   },
    handler: handlers.displayLanding
    // }
	},

	{
	  method: 'GET',
	  path: '/login',
	  config: {
      auth: {
        mode: "try",
        strategy: "github"
      },
      handler: handlers.login
    }
	},

  {
    method: 'GET',
    path: '/logout',
    config: {
      auth: false,
      handler: handlers.logoutUser
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
    path: '/profile',
    config: {
      auth: {
        mode: 'required',
        strategy: 'github'
      },
      handler: handlers.profile
    }
  },

	{
		method: 'GET',
		path: '/public/{path*}',
		handler: {
			directory: {
				path: '../public'
			}
		}
	}

];

module.exports = routes;