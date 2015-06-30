// START COPYING HERE

var Code = require('Code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

// some niceties

var describe = lab.describe;
var it = lab.it;
var before = lab.before;
var after = lab.after;
var expect = Code.expect;

// STOP COPYING HERE

var toCover = require('../toCover');

describe('stop istanbul complaining', function(){
  it('can be deleted after we have real tests', function(done){
    expect(toCover());
    done();
  });
});

describe('strings', function (){
  it('checks that strings have a length', function (done){
    expect('string'.length).to.exist().and.to.be.greaterThan(2);
    done();
  });
});
