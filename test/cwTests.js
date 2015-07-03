var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var handlers = require('../codewars/cwHandlers.js');
var Shot = require('shot');

// some niceties
var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

function decorate (reqDecorations, repDecorations, callback){
  return function(request, reply){
    for (var reqDec in reqDecorations){
      request[reqDec] = reqDecorations[reqDec];
    }

    for (var repDec in repDecorations){
      reply[repDec] = repDecorations[repDec];
    }

    callback(request, reply);
  };
}


var newKataDispatch = decorate({params:{kyuLevel: 8}}, {}, handlers.newkata);

// Shot.inject(newKataDispatch, {method: 'GET', url: '/kyu/8'}, function(response){
// 	it("reply is -8", function(done){
// 		expect(reply).to.equal(-8);
// 		done();
// 	});
// });

// Shot.inject(handlers.user);