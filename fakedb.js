var fakedb = {};

fakedb.db = [];
fakedb.result = [];

fakedb.connect = function(config, callback) {
  if (config) {
    return callback(null, "conn");
  } else {
    return callback(undefined, "No config");
  }
};

fakedb.table = function(name) {
    return this;
};

fakedb.insert = function(data) {
    fakedb.db.push(data);
    return this;
};

fakedb.filter = function(data) {
  var match;
  var keyLength = Object.keys(data).length;
  var counter = 0;
  var counter2 = 0;
  fakedb.result = this.db.filter(function(elem) {
    match = true;
    for (var key in data) {
      if (elem[key] !== data[key]) {
        match = false;
        return match;
      }
      if (++counter === keyLength && match === true) {
        return match;
      }
    }
  });

  this.db = fakedb.result;
  return this;

};

fakedb.run = function(connection, callback) {
  var cursor  = this.db;
  cursor.toArray = function(cb){
    cb(null, this.db);
  };

  if (connection) {
    return callback(null, cursor);
  }
  else {
    return callback(undefined, "Error");
  }
};

module.exports = fakedb;
