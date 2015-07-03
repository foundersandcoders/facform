var r = require('./fakedb.js');

var config = "config";
var connection;

r.connect(config, function(err, conn) {
  if (err) {
      throw err;
  }
  connection = conn;
});

r.table("users").insert({name: "nikki"}).run(connection, function(err, result) {
  console.log(err, result);
});
