'use strict';
const async =require('async');
const logger = global.local_require('/utils/logger');
const c_utils = global.local_require('/utils/commonutils');
const cloudant = global.local_require('/utils/cloudantutils');

const api = 'BILL RECORD API :';
const file = 'api.record.index';


exports = module.exports = {
		save_data:save_data,
		update_bill:update_bill,
		show_bill_data:show_bill_data
}


function save_data(request_data,cb){
	let func = ".save_data"
	
	cloudant.insert_document(request_data,'bill_details',function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR saving bill detials "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success = '+data);
			let op = {'status':200,'message':'bill details saved successfully','id':data.id};
			logger.info(api+file+func+"Bill record saved "+data);
			cb(null,op);
		}
});
}

function update_bill(doc_id,request_data,cb){
	let func = ".update_bill"
	cloudant.merge_document('bill_details',doc_id,request_data,function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR updating bill details "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success');
			console.log(data);
			let op = {'status':200,'message':'Bill Details Updated successfully','id':data.id};
			logger.info(api+file+func+"Bill Details updated "+data);
			cb(null,op);
		}
});
}

//function update_bill(request_data,cb){
//	let func = ".update_bill"
//	
//	cloudant.insert_document(request_data,'bill_update',function(err,data){
//		if(err){
//			//console.log('error saving doc'+JSON.stringify(err));
//			logger.error(api+file+func+"ERROR updating bill detials "+err);
//			cb(err,null);
//		}
//		else{
//			//console.log('save doc success = '+data);
//			let op = {'status':200,'message':'bill details updated successfully','id':data.id};
//			logger.info(api+file+func+"Bill record updated "+data);
//			cb(null,op);
//		}
//});
//}

function show_bill_data(cb) {
    let func = '.show_bill_data';
    let err_resp ={};
    try{
        cloudant.readAll('bill_details','bills','vw_all_bills',{'include_docs':true},function(err,data){
             if(!err){
                async.map(data.rows,function(bill,cb){
                    let json = {};
                    //console.log('bill = '+JSON.stringify(bill));
                    try{
                        json['BILLID'] = bill.doc.BILLID;
                        json['PAYER'] = bill.doc.PAYER;
                        json['BILLDATE'] = bill.doc.BILLDATE;
                        json['AMOUNT'] = bill.doc.AMOUNT;
                        json['ARNAB'] = bill.doc.ARNAB;
                        json['BIPRA'] = bill.doc.BIPRA;
                        json['SAURAV'] = bill.doc.SAURAV;
                        json['SAYAN'] = bill.doc.SAYAN;
                        json['TANMOY'] = bill.doc.TANMOY;
                        json['BILLDESC'] = bill.doc.BILLDESC;
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
                        //console.log(JSON.stringify(data));
                    }
                });
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
