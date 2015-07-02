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
    auth: {
      mode: 'try',
      strategy: 'github'
    },
    handler: handlers.login
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
    auth: {
      strategy: 'session'
    },
    handler: handlers.logout
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