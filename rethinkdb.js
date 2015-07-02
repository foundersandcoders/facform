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
   * create
   *
   * Adds to the database
   * @param {string} table - name of the DB table (Users/chats etc)
   * @param data - the element to be inserted into the database
   * @param {function} cb - a callback function
   * @returns {object} - the confirmation from the database
   */
  function create(table, data, cb){
    r.table(table).insert(data).run(connection, function(err, result) {
      if (err) {throw err;}
      return cb(result);
    });
  }
  //
  // function update(table, id, data, cb){
  //   r.table(table).get(id).update(data)
  //   return cb(result);
  // }

  function read(table, id, cb){
    r.table(table).get(id).run(connection, function(err, result){
      if (err) {throw err;}
      return cb(result);
    });
  }

  function readAll(table, cb){
    r.table(table).run(connection, function(err, cursor) {
        if (err) {throw err;}
        cursor.toArray(function(err, result) {
            if (err) {throw err;}
            return cb(result);
        });
    });
  }

  return {
    create: create,
    readAll: readAll,
    read: read
  };
};
