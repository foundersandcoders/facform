var handlebars = require('handlebars');
var fs = require('fs');

var handlers = {
  displayLanding: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply.view('index');
    }
      return reply.redirect('/home');
  },
  login: function(request, reply) {
    request.auth.session.set(request.auth.credentials);
    return reply.redirect('/home');
  },
  home: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      console.log('home');
      return reply.view('index');
    }
    console.log('else');
    return reply.view('home');
  },
  getProfile: function(request, reply) {
    return reply.view('profile');
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