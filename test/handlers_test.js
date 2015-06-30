var assert = require('assert');
var server = require('../server.js');

console.log("Testing the index.html is sent when requested and statusCode is 200");
server.inject({method: 'GET', url: '/'}, function (res) {
		assert.equal(res.statusCode, '200' );
});

console.log("Test to check that user is redirected to index.html with statusCode 302 when not authenticated");
server.inject({method: 'GET', url: '/home'}, function (res) {
		assert.equal(res.statusCode, '302' );
});

