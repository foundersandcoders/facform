var assert = require('assert');
var server = require('../server.js');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;


it("Testing the index.html is sent when requested and statusCode is 200", function(done){
  server.inject({method: 'GET', url: '/'}, function (res) {
    assert.equal(res.statusCode, '200' );
    done();
  });
});

it("Test to check that user is redirected to index.html with statusCode 302 when not authenticated", function(done){
  server.inject({method: 'GET', url: '/home'}, function (res) {
    assert.equal(res.statusCode, '302' );
    done();
  });
});

it("Test to see authentication redirects to github", function(done){
  server.inject({method: 'GET', url: '/login'}, function (res){
    assert.equal(res.statusCode, '302');
    done();
  });
});

it("Test that we get a kata of level 8kyu", function(done){
  server.inject({method: 'GET', url: '/kyu/8'}, function (res){
    console.log(res.raw.res.raw);
    expect(res).to.equal(-8);
    done();
  });
});