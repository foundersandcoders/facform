var server = require('./server.js');
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
			return reply.view('index');
		}
		return reply.view('home');
	}
};

module.exports = handlers;