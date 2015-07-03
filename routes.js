
var db = require('./rethinkdb.js')("rethinkdb");

module.exports = [

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
    path: '/',
    handler: function(request, reply) {
      reply("Welcome to the app");
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
