
var qs = {};

qs.decode = require('./decode');
qs.parse = require('./decode');
qs.encode = require('./encode');
qs.stringify = require('./encode');
//exports.decode = require('./decode');
//exports.parse = require('./decode');
//exports.encode = require('./encode');
//exports.stringify = require('./encode');

qs.love = function(){
	return false;
}

module.exports = qs;