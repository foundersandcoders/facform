var r = require('rethinkdb');

/**
 * export.methods function
 *
 * The database object to export
 * @param {object} [config] - optional config object. Must contain Host, Port, and database name. If omitted, default config is used.
 * @returns {object} - database methods
 */
module.exports = function(config){
  var connection = null;
  var configuration = config || {host: '127.0.0.1', port: 28015, db: 'Facform'};
  if(configuration.host === undefined || configuration.port === undefined || configuration.db ===undefined){
    throw "The parameter of the database must be {host: hostname, port: portNumber, db: databaseName}";
  }

  r.connect( configuration, function(err, conn) {
      if (err) {
          throw err;
      }
      connection = conn;
  });

  /**
   * createUser User
   *
   * Adds a user to the database
   * @param {object} User object from github (GET /users/:username)
   * @returns {object} User object that has been inserted in our database
   */
  function createUser(user, cb) {
    r.table('users').insert(user).run(connection, function(err, result) {
      if (err) {throw err;}
      console.log(result);
      return cb(result);
    });
  }

  function readAllUsers(cb) {
    r.table('users').run(connection, function(err, cursor) {
        if (err) {throw err;}
        cursor.toArray(function(err, result) {
            if (err) {throw err;}
            return cb(result);
        });
    });
  }
  return {
    createUser: createUser,
    readAllUsers: readAllUsers
  };
};
