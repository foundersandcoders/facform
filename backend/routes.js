var handlers = require('./handlers.js');
var db = require('../rethinkdb.js')();


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
    auth: false,
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
},
{
  method: "GET",
  path: '/createUser',
  handler: function(request, reply) {
    var result = db.create("users", {id: "11", name: "TEST", team: ['nikki', 'simon', 'rub1e']}, reply);
  }
},

{
  method: "GET",
  path: '/readUser',
  handler: function(request, reply) {
    db.readAll("users", reply);
  }

},
{
  method: "GET",
  path: '/readUserOpts',
  handler: function(request, reply) {
    db.read("users", {name: "TEST"}, reply, {team: "simon"});
  }
},
{
  method: "GET",
  path: '/update',
  handler: function(request, reply) {
    db.update("users", "10", {name: "simon"}, reply);
  }
}
];

module.exports = routes;
