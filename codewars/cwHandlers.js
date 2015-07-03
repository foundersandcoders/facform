var request = require('request');
var tokens = require('./cwTokens.json');

var handlers = {

  newkata: function (req, reply) {
    var path = req.params;
    var kyuLevel = path.kyuLevel;
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
      uri: 'https://www.codewars.com/api/v1/code-challenges/javascript/train',
      headers: {
        Authorization: tokens.codewars.claire.token,
        // Authorization: tokens.codewars.simon.token,
      },
      form: formObject
    };

    var cwData = {};

    request.post(options, function (err, response, body) {
      if (err) {
        return err;
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

  user: function (err, res, body) {
    var options = {
      method: 'GET',
      uri: 'https://www.codewars.com/api/v1/users/' + tokens.codewars.anni.username,
      headers: {
        Authorization: tokens.codewars.anni.token
      }
    };
    request(options, function (err, res, body) {
      if (err) {
        return err;
      }
      console.log(JSON.parse(body));
    });
  }

};

module.exports = handlers;