var r = require('./fakedb.js');

var config = "config";
var connection;

r.connect(config, function(err, conn) {
  if (err) {
      throw err;
  }
  connection = conn;
});

r.table("users").insert({name: "nikki", colour: "yellow", team: "awesome"}).run(connection, function(err, result) {
  console.log(err, result);
});

r.table("users").insert({name: "Simon", colour: "blue", team: "awesome"}).run(connection, function(err, result) {
  console.log(err, result);
});

r.table("users").insert({name: "rub1e", colour: "orange"}).run(connection, function(err, result) {
  console.log(err, result);
});

console.log("filtered", r.table("users").filter({team: "awesome"}).filter({name: "nikki"}));
