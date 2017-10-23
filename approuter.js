/**
 * API Channel
 */
'use strict';

var record = global.local_require('/api/record');
var user = global.local_require('/api/user');
var appinfo = global.local_require('/api/appinfo');
var exports = module.exports = {};

module.exports = function(pub) {
	pub.use('/api/v1/record',record);
    pub.use('/api/v1/user',user);
    pub.use('/api',appinfo);
};