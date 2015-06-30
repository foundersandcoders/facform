var r = require('rethinkdb');

var connection = null;

r.connect( {host: '127.0.0.2', port: 28015, db: 'Facform'}, function(err, conn) {
    if (err) {
        console.log('ERROR');
        throw err;
    }

    connection = conn;
});

function createUser(user) {
  r.table('users').insert(user).run(connection, function(err, result) {
    if (err) {throw err;}
    return JSON.stringify(result, null, 2);
  });
}

function readAllUsers() {
  r.table('users').run(connection, function(err, cursor) {
      if (err) {throw err;}
      cursor.toArray(function(err, result) {
          if (err) {throw err;}
          return JSON.stringify(result, null, 2);
      });
  });
}

module.exports = [
  {
    method: "GET",
    path: '/createUser',
    handler: function(request, reply) {
      reply(createUser({name: "Simon"}));
    }

  },
  {
    method: "GET",
    path: '/readUser',
    handler: function(request, reply) {
      reply(readAllUsers());
    }

  }

];
