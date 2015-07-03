var rethink = require('../rethinkdb.js')('./fakedb.js');

var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

it("connect function connects to rethink databse if configuration object is provided", function(done){
  var entry = {id: "1", name: "TEST", team: ['nikki', 'simon', 'rub1e']};
  rethink.create("users", entry , function(result){
    expect(result).to.equal([entry]);
    done();
  });
});
