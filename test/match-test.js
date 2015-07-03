var assert = require('assert');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var Code = require('code');

lab.test("Match endpoint", function(done) {
  var options = {
    method: "GET",
    url: "/match",
    auth: {
      isAuthenticated: true,
      credentials: {
        username: "testuser"
      }
    }
  };
  server.inject(options, function(response) {
    Code.expect(response.statusCode).to.equal(200);
    Code.expect(response.result).to.equal("<!DOCTYPE html><html><head><meta charset='utf-8'><title></title></head><body><p>testuser2</p></body></html>");
    done();
  });
});
