var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var handlers = require('../backend/handlers.js');
var Shot = require('shot');
var server = require('../server.js');

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
    Code.expect(response.result).to.equal("<!DOCTYPE html><html><head><meta charset=\"utf-8\"><title>chatbox</title></head><body><div id=\"chatbox\"><div id=\"pastchat\"></div><textarea id=\"message\" rows=\"3\" cols=\"40\"></textarea><button onclick=\"postMessage()\">Send</button></div><script src=\"https://cdn.socket.io/socket.io-1.2.0.js\"></script><script src=\"../public/js/script.js\"></script></body></html>");
    done();
  });
});
