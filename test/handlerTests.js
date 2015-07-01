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

function loginDispatch(request, reply){
  request.auth = {};
  request.auth.session = {};
  request.auth.session.set = function(credentials){
    expect(credentials).to.exist();
  };
  request.auth.credentials = "a string";

  reply.redirect = function(location){
    expect(location).to.equal('/home');
  };

  handlers.login(request, reply);
}

function landingDispatch(request, reply){
  request.auth = {};
  request.auth.isAuthenticated = true;

  reply.redirect = function(location){
    expect(location).to.equal('/home');
  };

  handlers.displayLanding(request, reply);
}

Shot.inject(loginDispatch, {method: 'get', url: '/login'});

Shot.inject(landingDispatch, {method: 'get', url: '/'});
