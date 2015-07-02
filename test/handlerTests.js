var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var handlers = require('../backend/handlers.js');
var Shot = require('shot');

// some niceties
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

function decorate (reqDecorations, repDecorations, callback){
  return function(request, reply){
    for (var reqDec in reqDecorations){
      request[reqDec] = reqDecorations[reqDec];
    }

    for (var repDec in repDecorations){
      reply[repDec] = repDecorations[repDec];
    }

    callback(request, reply);
  };
}

var loginDispatch = decorate(
  {
    auth: {
      session: {set: function(credentials){expect(credentials).to.exist();}},
      credentials: {profile: {displayName: 'string'}}
    },
  },
  {
    view: function(location){expect(location).to.equal('index');},
  },
  handlers.login
);

var loginDispatchWhenAuthenticated = decorate(
  {
    auth: {
      isAuthenticated: true,
      session: {set: function(credentials){expect(credentials).to.exist();}},
      credentials: {profile: {displayName: 'string'}}
    }
  },
  {
    view: function(location){expect(location).to.equal('dashboard');},
  },
  handlers.login
);

var landingDispatch = decorate(
  {
    auth: {isAuthenticated: true},
  },
  {
    redirect: function(location){expect(location).to.equal('/dashboard');}
  },
  handlers.displayLanding
);

var homeDispatchNotAuthenticated = decorate(
  {
    auth: {isAuthenticated: false}
  },
  {
    view: function(location){expect(location).to.equal('index');}
  },
  handlers.dashboard
);

var homeDispatch = decorate(
  {
    auth: {
      isAuthenticated: true,
      credentials: {profile: {displayName: 'string'}}
    }

  },
  {
    view: function(location){expect(location).to.equal('dashboard');}
  },
  handlers.dashboard
);

var profileDispatchWhenAuthenticated = decorate(
  {
    auth: {
      isAuthenticated: true,
      credentials: {profile: {displayName: 'string'}}
    }
  },
  {
    view: function(location){expect(location).to.equal('profile');},
  },
  handlers.profile
);

Shot.inject(loginDispatch, {method: 'get', url: '/login'});

Shot.inject(loginDispatchWhenAuthenticated, {method: 'get', url: '/dashboard'});

Shot.inject(landingDispatch, {method: 'get', url: '/'});

Shot.inject(homeDispatchNotAuthenticated, {method: 'get', url: '/dashboard'});

Shot.inject(homeDispatch, {method: 'get', url: '/dashboard'});

Shot.inject(profileDispatchWhenAuthenticated, {method: 'get', url: '/profile'});
