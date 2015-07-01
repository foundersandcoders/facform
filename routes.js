var db = require('./rethinkdb.js')({host: '127.0.0.1', db: 'Facform'});

module.exports = [
  {
    method: "GET",
    path: '/createUser',
    handler: function(request, reply) {
      reply.file(__dirname + "/public/templates/createUser.html");
    }

  },
  {
    method: "POST",
    path: '/createUser',
    handler: function(request, reply) {
      var result = db.createUser({name: request.payload.username}, reply);
    }
  },

  {
    method: "GET",
    path: '/readUser',
    handler: function(request, reply) {
      db.readAllUsers(reply);
    }

  },

  {
    method: "GET",
    path: '/',
    handler: function(request, reply) {
      reply("Welcome to the app");
    }
  }

];
