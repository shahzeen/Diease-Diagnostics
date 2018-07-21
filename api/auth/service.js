'use strict';
const async = require('async');
const moment = require('moment');
const logger = global.local_require('/utils/logger');
const cloudant = global.local_require('/utils/cloudantutils');
const file = 'api.auth.service.js ::';

exports.login = function login(username, password, timestamp, callback) {
	const func = 'login func :: ';
	try{
		logger.debug(file+func+'Client timestamp is = '+timestamp);
        // username = username.toUpperCase();
        cloudant.readAll('bill_details', 'login', 'vw_reg_user?'+'key="'+username+'"', '', function(err, result){
            //logger.log('INFO','Login db resp = '+JSON.stringify(result));
            if(err){
                callback('ERR-DB-ERROR', 'Server / database error');
            }else{
                if(result.rows.length === 0){
                    callback('ERR-NO-RECORD', 'User Information not found');
                }else{
                    if (username == result.rows[0].key && password == result.rows[0].value.Password) {
                        logger.info(file+func+'Username and password are matching!');
                        callback(null, result.rows[0].value);
                    }
                    else{
                        logger.info(file+func+'Username and password not matching!');
                        callback('ERR-PSWD-MISMATCH', 'User password is not correct');
                    }
                }
            }
        });
	}catch(excep){
		console.log(file+func+'Error in login service function excep = '+excep);
	}
}