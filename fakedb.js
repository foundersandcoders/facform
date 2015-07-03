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

fakedb.get = function(id) {
  var newdb = {};
  newdb.toUpdate = fakedb.db.filter(function(element){
    return element.id === id;
  });
  newdb.keep = fakedb.db.filter(function(element){
    return element.id !== id;
  });

  newdb.update = function(options) {
    newdb.toUpdate.forEach(function(element){
      for (var key in options){
        element[key] = options[key];
      }
    });
    fakedb.db = newdb.toUpdate.concat(newdb.keep);
    return fakedb;
  };

  return newdb;
};

fakedb.filter = function(data) {

  fakedb.result = this.db.filter(function(elem) {
    for (var key in data) {
      if (!elem[key] || elem[key] !== data[key]) {
        return false;
      }
    }
    return true;
  });

  this.db = fakedb.result;
  return this;

};

fakedb.run = function run(connection, callback) {
  var cursor  = {};
  cursor.toArray = function(cb){
    cb(null, this.db);
  }.bind(this);

  if (connection) {
    return callback(null, cursor);
  }
  else {
    return callback(undefined, "Error");
  }
};

module.exports = fakedb;
