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
		get_inbox_data:get_inbox_data,
		get_inbox_details_data:get_inbox_details_data
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

function get_inbox_data(id, year, cb) {
    let func = '.get_inbox_data';
    let err_resp ={};
    try{
		let opts ={'include_docs': true,'key': [id,parseInt(year)]};
		console.log('opts = '+JSON.stringify(opts));
        cloudant.readAll('bill_details','inbox','vw_inbox',opts,function(err,data){
             if(!err){
				 if(data.rows.length){
					let inbox  = [];
					let inboxDetails  = [];
					for(var i=1; i<53; i++){
						let filteredArr = [];
						let weekid = "Y2017W"+i;
						data.rows.filter(function (bill){
							//console.log('bill = '+JSON.stringify(bill));
							return bill.doc.WEEKID === weekid;
						}, this)
						.forEach(function(filteredData){
							
							filteredArr.push(filteredData);
							//console.log('filteredData = '+JSON.stringify(filteredData));
						});
						let json = {};
						let inboxDataSubJson = {};
						json[weekid] = filteredArr;
						
						if(json[weekid].length){
							inboxDetails.push(json);
							inboxDataSubJson.week_no = i;
							inboxDataSubJson.total_amount = 0;
							inboxDataSubJson.week_id = weekid;
							json[weekid].forEach(function(bill){
								var mon = moment(bill.doc.BILLDATE).startOf('week').isoWeekday(8);
								var sun = moment(bill.doc.BILLDATE).startOf('week').isoWeekday(14);
								inboxDataSubJson.user_id = bill.doc.User_Id;
								inboxDataSubJson.bill_date = bill.doc.BILLDATE;
								// inboxDataSubJson.week_no = moment(bill.doc.BILLDATE).isoWeek();
								inboxDataSubJson.first_day = moment(mon).toISOString();
								inboxDataSubJson.last_day = moment(sun).toISOString();
								inboxDataSubJson.total_amount = inboxDataSubJson.total_amount + bill.doc.AMOUNT;
							});
							inbox.push(inboxDataSubJson);
						}
					}
					cb(null,inbox);
					//  async.map(data.rows,function(inboxData,cb){
					// 	let json = {};
					// 	try{
					// 		json = inboxData.doc;
					// 	}catch(err){
					// 		console.log(err);
					// 	}
					// 	cb(null,json);
					// },function(err,data){
					// 	if(err){
					// 		err_resp =  c_utils.set_error_response(500,'ERR500','Internal Server Error '+err);
					// 		logger.error(api+file+func+' Internal Server Error :'+err);  
					// 		cb(err_resp,null);
					// 	}else{
					// 		cb(null,data);
					// 	}
					// });
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

function get_inbox_details_data(id, weekid, cb) {
    let func = '.get_inbox_details_data';
    let err_resp ={};
    try{
		let opts ={'include_docs': true,'key': [id,weekid]};
        cloudant.readAll('bill_details','inbox','vw_inbox_details',opts,function(err,data){
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
					 cb(null,"No bill details found");
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