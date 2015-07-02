var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var handlers = require('../backend/handlers.js');
var Shot = require('shot');
var server = require('../server.js');
var fs = require('fs');

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
    Code.expect(response.result).to.equal(fs.readFileSync('public/templates/chatbox.html').toString());
    done();
  });
});
