var Hapi = require('hapi');
var server = new Hapi.Server();
var routes = require ('./routes.js'); // Check with Abdi and Anit
var handlebars = require('handlebars');

module.exports = server;

server.connection({
  port: process.env.PORT,
});

server.views({
  engines: {
    html: handlebars
  },
  path: __dirname + '/public/templates'
});

server.register(require('hapi-auth-cookie'), function (err) {
  server.auth.strategy('session', 'cookie', {
    password: 'password',
    cookie: 'sid-example',
    redirectTo: '/'
  });
});

server.register(require('fixed-bell'), function(err){
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'password',
    clientId: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    scope: ['user'],
    // forceHttps: true
  });
});

server.route(routes);

server.start();
