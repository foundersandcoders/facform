var handlebars = require('handlebars');
var fs = require('fs');

/**
 * @namespace handlers
 */
var handlers = {
/**@method
 * @description Checks authentication and forwards user to relevant page
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Index - if not authenticated
 * @returns {object} Dashboard - if authenticated
 */
  displayLanding: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply.view('index');
    }
      return reply.redirect('/dashboard');
  },
/**@method
 * @description Login function - sets session authentication
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Dashboard - if authenticated, name set to auth credentials
 * @returns {object} Index - if not authenticated
 */
  login: function(request, reply) {
    if(request.auth.isAuthenticated) {
      request.auth.session.set(request.auth.credentials);
      reply.view('dashboard', {name: request.auth.credentials.profile.displayName});
    } else {
      reply.view('index');
    }
  },
/**@method
 * @description Dashboard handler, appears to double login function
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Index - if not authenticated
 * @returns {object} Dashboard - if authenticated, name set to auth credentials
 */
  dashboard: function(request, reply) {
    if (!request.auth.isAuthenticated) { 
      return reply.view('index');
    }
    var context = {
      name: request.auth.credentials.profile.displayName
    };
    return reply.view('dashboard', context);
  },
/**@method
 * @description Profile handler, checks authentication and bounces to index if not authenticated
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Profile - if authenticated, name set to auth credentials
 * @returns {object} Index - if not authenticated, name set to "stranger"
 */
  profile: function(request, reply) {
    if(request.auth.isAuthenticated) {
      reply.view('profile', { name: request.auth.credentials.profile.displayName });
    } else {
      reply.view('index', { name: 'stranger!' });
    }
  },
/**@method
 * @description Handler to join challenge, no auth at present
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Challenge
 */
  joinChallenge: function(request, reply) {
    return reply.view('challenge');
  },
/**@method
 * @description Logout handler, clears authentication state
 * @param request {object} - request
 * @param reply {object} - reply
 * @returns {object} Root file, with cleared auth session
 */
  logout: function(request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  }
};

module.exports = handlers;
