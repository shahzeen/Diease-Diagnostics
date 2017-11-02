'use strict';
const async =require('async');
const moment = require('moment');
const logger = global.local_require('/utils/logger');
const c_utils = global.local_require('/utils/commonutils');
const cloudant = global.local_require('/utils/cloudantutils');

const api = 'USER API :';
const file = 'api.user.service';


exports = module.exports = {
		save_data:save_data,
		get_inbox_data:get_inbox_data
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

function get_inbox_data(id, cb) {
    let func = '.get_inbox_data';
    let err_resp ={};
    try{
		let opts ={'include_docs': true,'key': id};
        cloudant.readAll('bill_details','inbox','vw_inbox',opts,function(err,data){
             if(!err){
				 if(data.rows.length){
					 async.map(data.rows,function(inboxData,cb){
						let json = {};
						try{
							json = inboxData.doc;
						}catch(err){
							console.log(err);
						}
						cb(null,json);
					},function(err,data){
						if(err){
							err_resp =  c_utils.set_error_response(500,'ERR500','Internal Server Error '+err);
							logger.error(api+file+func+' Internal Server Error :'+err);  
							cb(err_resp,null);
						}else{
							cb(null,data);
						}
					});
				 }else{
					 cb(null,"No bill added yet");
				 }
                
            }else{
                cb(null,[]);
            }
            
        });
    }catch(err){
        err_resp =  c_utils.set_error_response(500,'ERR500','Server Error');
		logger.error(api+file+func+' Server Error in retriving data from database:'+err);  
		cb(err_resp,null);
    }
}