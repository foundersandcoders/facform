var hapi = require('hapi'),
    server = new hapi.Server(),
    path = require('path'),
    routes = require('./backend/routes.js'), // Check with Abdi and Anit
    handlebars = require('handlebars'),
    hapiAuthCookie = require('hapi-auth-cookie'),
    bell = require('fixed-bell');

module.exports = server;

server.connection({
  port: process.env.PORT
});

server.views({
  engines: {
    html: handlebars
  },
  path: path.join(__dirname, "/public/templates")
});

server.register(hapiAuthCookie, function (err) {
  server.auth.strategy('session', 'cookie', {
    password: 'password',
    cookie: 'sid-example'
  });
});

server.register(bell, function (err) {
  server.auth.strategy("github", 'bell', {
    provider: 'github',
    password: 'github-password', //Password used for encryption
    clientId: process.env.APPID,//'YourAppId',
    clientSecret: process.env.APPSECRET,//'YourAppSecret',
    isSecure: false, //means authentication can occur over http
    scope: ['user']
  });
});

server.route(routes);

server.start(function () {
  server.log('Server running at: ' + server.info.uri);
});