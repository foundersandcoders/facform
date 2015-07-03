var handlers = require('./cwHandlers.js');

var routes = [

  {
    method: 'GET',
    path: '/kyu/{kyuLevel}/{config?}',
    handler: handlers.newkata
  },

  {
    method: 'GET',
    path: '/user/{user}/{route?}',
    handler: handlers.user
  }

];

module.exports = routes;