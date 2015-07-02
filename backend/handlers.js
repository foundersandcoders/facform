var handlebars = require('handlebars');
var fs = require('fs');

var handlers = {
  displayLanding: function(request, reply) {
    if (request.auth.isAuthenticated) {
      reply.view('home', { name: request.auth.credentials.profile.displayName });
    } else {
      reply.view('home', { name: 'stranger!' });
    }
  },

  home: function(request, reply) {
    if (request.auth.isAuthenticated) {
      reply.view('home', { name: request.auth.credentials.profile.displayName });
    } else {
      reply.view('home', { name: 'stranger!' });
    }
  },

  login: function(request, reply) {
    if(request.auth.isAuthenticated) {
      request.auth.session.set(request.auth.credentials.profile);
      // console.log(request.auth.credentials);
      reply.redirect('/');
      // request.auth.session.set(request.auth.credentials.profile);
      // reply.view('home', { name: request.auth.credentials.raw.name });
    } else {
      reply.view('home', { name: 'stranger!' });
    }
  },

  profile: function(request, reply) {
    if(request.auth.isAuthenticated) {
      reply.view('profile', { name: request.auth.credentials.profile.displayName });
    } else {
      reply.view('home', { name: 'stranger!' });
    }
  },

  logoutUser: function(request,reply) {
    request.auth.session.clear();
    reply.redirect('/');
  }

};

module.exports = handlers;