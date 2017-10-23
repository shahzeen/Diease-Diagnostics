'use strict';
const async =require('async');
const moment = require('moment');
const logger = global.local_require('/utils/logger');
const c_utils = global.local_require('/utils/commonutils');
const cloudant = global.local_require('/utils/cloudantutils');

const api = 'USER API :';
const file = 'api.user.service';


exports = module.exports = {
		save_data:save_data
}


function save_data(request_data,cb){
	let func = ".save_data"
	
	cloudant.insert_document(request_data,'bill_details',function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR saving new user detials "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success = '+data);
			let op = {'status':200,'message':'new user details saved successfully','id':data.id};
			logger.info(api+file+func+"New user details saved "+data);
			cb(null,op);
		}
    });
}
