/**
 * API routes for Managing Samples 
 */
'use strict';
const express = require('express');
const service = global.local_require('api/sample/service');
const logger = global.local_require('/utils/logger');

const api = 'SAMPLE API :: ';
const file = 'api.sample.index :: ';

const sample= express();

sample.post('/create',  function(req, res) {
	const func = '.post';
	//console.log('req = '+JSON.stringify(req.body));
	try {
	   //console.log('req.body = '+JSON.stringify(req));
        if(req.body && Object.keys(req.body).length > 0) {
	        let request_ip = req.body;
	        //console.log('inside req.body = '+JSON.stringify(req.body));
                     service.create_sample_record(request_ip,function(err,data){
                        if(!err){
                            res.status(200).json(data);     
                        }else{
                        	//console.log('err = '+JSON.stringify(err));
               				let status = err.status;
                            let error = err.error;
                            let message = err.message;
                            let response_message = {'status':status,'message':message};
                            logger.error(api+file+func+' Internal Server Error in saving sample record :: '+err);  
                            res.status(status).json(response_message);
                        }
                    });
             
        }else{
             res.status(422).json({'status':422,'message':'Missing or Unparsebale Entity','data':[]});
        }
       }catch(err){
        logger.error(api+file+func+' Internal Server Error in saving sample record :: '+err);
        //console.log('catch err = '+JSON.stringify(err));
        res.status(500).json({'status':500,'message':'API Response Error'});
 }
});

sample.get('/show/all',  function(req, res) {
	const func = 'get/show/all :: ';
	    try {
	        service.show_all_sample(function(err,result){
	            if(!err){
	                res.status(200).json({'status':'ok','message':'success','data':result});
	            }else{
                    if(err === 'ERR-AUTH'){
						console.log('ERROR', api+file+func+'Unauthorized user');  
	                	res.status(401).json({'status':401,'message':'Unauthorized user','data':[]});
					}else{
                        console.log(api+file+func+' Internal Server Error in retriving all bills from database :'+JSON.stringify(err));  
                        res.status(500).json({'status':500,'message':'Authentication failed','data':[]});
                    }
	            }
	        });
	     }catch(err){
	        console.log(api+file+func+' Internal Server Error in retriving bills from database :'+err);  
	        res.status(500).json({'status':500,'message':'API Response Error','data':[]});
	    }
});

sample.delete('/remove/:id', function(req, res){
    const func = '/remove/{id} :: ';
    try{
        var id = req.params.id;
        service.delete_doc(id,function(err,result){
            if(!err){
                res.status(200).json(result);
                // res.status(200).json({'status':'ok','message':'success','data':result});
            }else{
                console.log(api+file+func+' Internal Server Error in deleting sample record from database :'+JSON.stringify(err));
                res.status(500).json({'status':500,'message':'Internal Server Error in deleting sample record','data':[]});
            }
        });
    }catch(err){
        console.log(api+file+func+' Internal Server Error in deleting sample record from database :: '+err);  
        res.status(500).json({'status':500,'message':'API Response Error','data':[]});
    }
});
    

module.exports = sample;
