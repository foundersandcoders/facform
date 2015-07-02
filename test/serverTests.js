var assert = require('assert');
var server = require('../server.js');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;


it("Testing the index.html is sent when requested and statusCode is 200", function(done){
  server.inject({method: 'GET', url: '/'}, function (res) {
    assert.equal(res.statusCode, '200' );
    done();
  });
});

it("Test to check that user is sent to index.html with statusCode 200 when not authenticated", function(done){
  server.inject({method: 'GET', url: '/dashboard'}, function (res) {
    assert.equal(res.statusCode, '200' );
    done();
  });
});

it("Test to check that user is sent to dashboard.html with statusCode 200 when user is authenticated", function(done){
  server.inject({method: 'GET', url: '/dashboard'}, function (res) {
    assert.equal(res.statusCode, '200' );
    done();
  });
});

it("Test to see authentication redirects to github", function(done){
  server.inject({method: 'GET', url: '/login'}, function(res){
    assert.equal(res.statusCode, '302');
    done();
  });
});

it("Test to check that user is sent to challenge.html with statusCode 200", function(done){
  server.inject({method: 'GET', url: '/join-challenge'}, function(res){
    assert.equal(res.statusCode, '200');
    done();
  });
});

it("Test to check that user is sent to profile.html with statusCode 200 when authenticated", function(done){
  server.inject({method: 'GET', url: '/profile'}, function(res){
    assert.equal(res.statusCode, '200');
    done();
  });
});

it("Test to check that user is redirected to landing page with statusCode 302", function(done){
 server.inject({method: 'GET', url: '/logout'}, function (res) {
   assert.equal(res.statusCode, '302' );
   done();
 });
});