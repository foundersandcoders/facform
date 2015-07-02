var request = require('request');
// var server = require('./server.js');
var tokens = require('./cwTokens.json');
// var fs = require('fs');

var handlers = {

  newkata: function (req, res) {
    var path = req.params;
    var kyuLevel = path.kyuLevel;
    var formObject;
    console.log(kyuLevel);

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
    request.post(options, function (err, res, body) {
      if (err) {
        return err;
      }
      console.log(JSON.parse(body));
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