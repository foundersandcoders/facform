var handlers = require('./cwHandlers.js');

var routes = [

  {
    method: 'GET',
    path: '/kyu/{kyuLevel}',
    handler: handlers.newkata
  },

  {
    method: 'POST',
    path: '/user',
    handler: handlers.user
  }

];

module.exports = routes;