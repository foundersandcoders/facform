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
  var configuration = config || {host: '127.0.0.2', port: 28015, db: 'Facform'};
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


  /**
   * update
   *
   * Updates one element of the database
   * @param {string} table - name of the DB table (Users/chats etc)
   * @param id - id of the element to be updated
   * @param updateObj - the property to be updated and the value e.g. {status: "completed"}
   * @param {function} cb - a callback function
   * @returns {object} - the confirmation from the database
   */

  function update(table, id, upateObj, cb){
    r.table(table).get(id).update(upateObj).run(connection, function(err, result) {
      if (err) {throw err;}
      return cb(result);
    });
  }

  /**
  * read
  *
  * Reads from the database
  * @param {string} table - name of the DB table (Users/chats etc)
  * @param {object} options - list of properties and values to filter database by e.g. {id: 1}
  * @param {function} cb - a callback function
  * @param {object} {arrOptions} - if filtering an element stored in an array specify an object with the property name and the array element e.g. {team: "Simon"}
  * @returns {array} - array of objects from the database that match the options
  */

    function read(table, options, cb, arrOptions){
    if (arrOptions) {
      r.table(table).filter(options).filter(function(elem) {
        var key = Object.keys(arrOptions)[0];
        var value = arrOptions[key];
        return elem(key).contains(value);
      }).run(connection, function(err, cursor) {
          if (err) {throw err;}
          cursor.toArray(function(err, result) {
              if (err) {throw err;}
              return cb(result);
          });
        });
    }
    else {
      r.table(table).filter(options).run(connection, function(err, cursor) {
          if (err) {throw err;}
          cursor.toArray(function(err, result) {
              if (err) {throw err;}
              return cb(result);
          });
      });
    }
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
    read: read,
    update: update
  };
};
