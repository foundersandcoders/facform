var request = require('request');
// var server = require('./server.js');
var tokens = require('./cwTokens.json');
// var fs = require('fs');

var handlers = {

  newkata: function (req, reply) {
    var path = req.params;
    var kyuLevel = path.kyuLevel;
    var formObject;
    // console.log(kyuLevel);

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

      // console.log("All data: ",cwData.level); // Data to return to the page // 
      // console.log("href: ",cwData.link); // The  kata ID  need to be sent to DB plus solved : false 
      // console.log(reply);
      reply(null, cwData.level);
      return reply.close();
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