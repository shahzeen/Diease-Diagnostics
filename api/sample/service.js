'use strict';
const async =require('async');
const logger = global.local_require('/utils/logger');
const c_utils = global.local_require('/utils/commonutils');
const cloudant = global.local_require('/utils/cloudantutils');
var gen = global.local_require('/utils/generator');

const api = 'SAMPLE API :: ';
const file = 'api.sample.index :: ';


exports = module.exports = {
    create_sample_record:create_sample_record,
    show_all_sample:show_all_sample,
    delete_doc:delete_doc
}


function create_sample_record(request_data,cb){
	let func = ".create_sample_record";
	
	cloudant.insert_document(request_data,'diease_diagnostics',function(err,data){
		if(err){
			//console.log('error saving doc'+JSON.stringify(err));
			logger.error(api+file+func+"ERROR saving sample records :: "+err);
			cb(err,null);
		}
		else{
			//console.log('save doc success = '+data);
			let op = {'status':200,'message':'Sample record ADDED successfully','id':data.id};
			logger.info(api+file+func+"Sample record saved :: "+data);
			cb(null,op);
		}
});
}

function show_all_sample(cb) {
    let func = 'show_all_sample :: ';
    let err_resp ={};
    
    try{
        cloudant.readAll('diease_diagnostics','sample','vw_all_sample',{'include_docs':true},function(err,data){
            if(!err){
               async.map(data.rows,function(bill,cb){
                   cb(null,bill.doc);
               },function(err,data){
                   if(err){
                       err_resp =  c_utils.set_error_response(500,'ERR500','Internal Server Error '+err);
                       console.log(api+file+func+' Internal Server Error :'+err);  
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

function delete_doc(id,cb){
    let func = 'delete_doc :: ';
    let err_resp ={};
    try{
        cloudant.delete_doc_by_id('diease_diagnostics',id, function(err,data){
            if(err){
                //console.log('error saving doc'+JSON.stringify(err));
                logger.error(api+file+func+"ERROR deleting sample records :: "+err);
                cb(err,null);
            }
            else{
                //console.log('save doc success = '+data);
                let op = {'status':200,'message':'Sample record DELETED successfully','id':id};
                logger.info(api+file+func+"Sample record deleted :: "+data);
                cb(null,op);
            }
        });
    }catch(err){
        err_resp =  c_utils.set_error_response(500,'ERR500','Server Error');
		logger.error(api+file+func+' Server Error in deleting sample record from database ::'+err);  
		cb(err_resp,null);
    }
}