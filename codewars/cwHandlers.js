var request = require('request');
var tokens = require('./cwTokens.json');

var handlers = {

  newkata: function (req, reply) {
    var path = req.params;
    var kyuLevel = path.kyuLevel;
    var uriConfig = path.config;
    var formObject;

    if (kyuLevel === 'random' || kyuLevel === 'default') {
      formObject = {
        strategy: kyuLevel
      };
    }
    else {
      formObject = {
        strategy: 'kyu_' + kyuLevel + '_workout'
      };
    }

    var options = {
      uri: uriConfig || 'https://www.codewars.com/api/v1/code-challenges/javascript/train',
      headers: {
        Authorization: tokens.codewars.claire.token,
        // Authorization: tokens.codewars.simon.token,
      },
      form: formObject
    };

    var cwData = {};

    request.post(options, function (err, response, body) {
      if (err) {
        return reply(err);
      }
      var data = JSON.parse(body);

      cwData = {
        name: data.name,
        level: data.rank,
        description: data.description,
        id: data.session.projectId,
        setup: data.session.setup,
        link: data.href
      };

      reply(cwData);
    });
  },

  user: function (req, reply) {
    var route = req.params.route || 'https://www.codewars.com/api/v1/users/';
    var options = {
      method: 'GET',
      uri: route + req.params.user,
      headers: {
        Authorization: tokens.codewars.claire.token
      }
    };
    request(options, function (err, response, body) {
      if (err) {
        return reply(err);
      }
      reply(JSON.parse(body));
    });
  }

};

module.exports = handlers;