var r = require('rethinkdb');

var connection = null;

r.connect( {host: 'localhost', port: 28015, db: 'Facform'}, function(err, conn) {
    if (err) {
        console.log('ERROR');
        throw err;
    }

    connection = conn;
});

function createUser(user) {
  r.table('users').insert(user).run(connection, function(err, result) {
    if (err) {throw err;}
    console.log(JSON.stringify(result, null, 2));
  });
}

function readAllUsers() {
  r.table('users').run(connection, function(err, cursor) {
      if (err) {throw err;}
      cursor.toArray(function(err, result) {
          if (err) {throw err;}
          console.log(JSON.stringify(result, null, 2));
      });
  });
}
