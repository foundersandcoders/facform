var r = require('rethinkdb');

var connection = null;

r.connect( {host: '127.0.0.2', port: 28015, db: 'Facform'}, function(err, conn) {
    if (err) {
        console.log('ERROR');
        throw err;
    }

    connection = conn;
});

function createUser(user, reply) {
  r.table('users').insert(user).run(connection, function(err, result) {
    if (err) {throw err;}
    // return JSON.stringify(result, null, 2);
    reply(result);
  });
}

function readAllUsers(reply) {
  r.table('users').run(connection, function(err, cursor) {
      if (err) {throw err;}
      cursor.toArray(function(err, result) {
          if (err) {throw err;}
          // return JSON.stringify(result, null, 2);
          reply(result);
      });
  });
}

module.exports = [
  {
    method: "GET",
    path: '/createUser',
    handler: function(request, reply) {
      createUser({name: "Fac"}, reply);
    }

  },
  {
    method: "GET",
    path: '/readUser',
    handler: function(request, reply) {
      readAllUsers(reply);
    }

  }

];
