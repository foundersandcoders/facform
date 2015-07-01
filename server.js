var Hapi = require('hapi');
var server = new Hapi.Server();
var routes = require ('./routes.js'); // Check with Abdi and Anita

server.connection({
  port: process.env.PORT || 8000
});

server.register(require('hapi-auth-cookie'), function (err) {
  server.auth.strategy('session', 'cookie', {
    password: 'password',
    cookie: 'sid-example',
    redirectTo: '/'
  });
});

server.register(require('./bell'), function(err){
  server.auth.strategy('github', 'bell', {
    provider: 'github',
    password: 'password',
    clientId: process.env.APPID,
    clientSecret: process.env.APPSECRET,
    scope: ['user'],
    forceHttps: true
  });
});

server.route(routes);

server.start();
