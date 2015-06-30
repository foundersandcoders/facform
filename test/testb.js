// START COPYING HERE

var Code = require('Code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var test = require('./test.js');

// some niceties

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

// STOP COPYING HERE

describe('strings', function (){
  it('checks that strings have a length', function (done){
    expect('string'.length).to.exist().and.to.be.greaterThan(2);
    done();
  });
});

module.exports
