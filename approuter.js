/**
 * API Channel
 */
'use strict';

var sample = global.local_require('/api/sample');
var appinfo = global.local_require('/api/appinfo');
var exports = module.exports = {};

module.exports = function(pub) {
	pub.use('/api/v1/sample',sample);
    pub.use('/api',appinfo);
};