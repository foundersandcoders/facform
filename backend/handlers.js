module.exports = function(config){
  var handlebars = require('handlebars');
  var fs = require('fs');
  var DB = require('../rethinkdb.js')(config);

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
        DB.create('users', request.auth.credentials.profile, function(data){
          console.log(request.auth.credentials.profile.displayName + ' added to database');
        });
        reply.view('dashboard', {name: request.auth.credentials.profile.displayName});
      } else {
        reply.view('index');
      }
    },
    dashboard: function(request, reply) {
      if (!request.auth.isAuthenticated) {
      console.log(request.auth);
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
    },
    createSession: function (request,reply){
      var chatroomNum = request.params.roomNumber;//Submitted from client-side post request;
      var user1 = request.auth.credentials.profile.username;
      var kata = request.params.kata;//Submitted from client-side post request;
      DB.create('activities', {id: chatroomNum, messages:[], participants: [user1], kata: kata},function(){
        return reply.redirect('/chatbox/'+chatroomNum);
      });
    }
  };
  return handlers;
};
