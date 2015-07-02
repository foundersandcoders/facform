var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var handlers = require('../handlers.js');
var Shot = require('shot');

// some niceties
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

lab.test("chat.connected test", function(done) {
  var options = {
    method: "GET",
    url: "/chatbox/85674367",
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
