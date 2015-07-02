var db = require('./rethinkdb.js')();

module.exports = [

  {
    method: "GET",
    path: '/createUser',
    handler: function(request, reply) {
      var result = db.create("users", {id: "1", name: "TEST"}, reply);
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
    path: '/',
    handler: function(request, reply) {
      reply("Welcome to the app");
    }
  },

  {
    method: "GET",
    path: '/readUser/{id}',
    handler: function(request, reply) {
      db.read("users", request.params.id, reply);
    }
  }


];
