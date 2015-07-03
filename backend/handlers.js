var handlebars = require('handlebars');
var fs = require('fs');

var handlers = {
  displayLanding: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply.view('index');
    }
      return reply.redirect('/dashboard');
  },
  login: function(request, reply) {
    if(request.auth.isAuthenticated) {
      request.auth.session.set(request.auth.credentials);
      reply.view('dashboard', {name: request.auth.credentials.profile.displayName});
    } else {
      reply.view('index');
    }
  },
  dashboard: function(request, reply) {
    if (!request.auth.isAuthenticated) { 
      return reply.view('index');
    }
    var context = {
      name: request.auth.credentials.profile.displayName
    };
    return reply.view('dashboard', context);
  },
  profile: function(request, reply) {
    if(request.auth.isAuthenticated) {
      reply.view('profile', { name: request.auth.credentials.profile.displayName });
    } else {
      reply.view('index', { name: 'stranger!' });
    }
  },
  joinChallenge: function(request, reply) {
    return reply.view('challenge');
  },
  logout: function(request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  }
};

module.exports = handlers;
