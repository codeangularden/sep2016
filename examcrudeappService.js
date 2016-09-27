/**
* Created by ganeshr.
*/ 

'use strict'
let co = require('co');
let coDal = require('./../../../../JOS/DALNoSql');
let mongodb = require('mongodb');
let helperService = require('./../sHelpers/helperService.js');
// written by ganeshr
exports.getOne =  co.wrap(function*(examcrudeapp) {
    
    let requestStatus = {
		status : false
    }

    if(examcrudeapp === undefined || examcrudeapp == null || examcrudeapp.toString().trim() == ""){
    	requestStatus.reason = "Invalid object field value";
    	return requestStatus;
    }

    try {

        let db = yield coDal.getNoSqlDB();	    
	    let result = yield db.examcrude.findOne({"_id" : examcrudeapp});
		requestStatus.result=result;
	    requestStatus.status = true;
	    

    } catch (err) {
        console.error(err.stack);
        requestStatus.reason = err.stack;
    }

	return requestStatus;

});

// written by ganeshr
exports.getList =  co.wrap(function*() {
      

	let result=[];
    try {

        let db = yield coDal.getNoSqlDB();
	    result = yield db.examcrude.find().toArray();
	    

    } catch (err) {
        console.error(err.stack);
        
    }

	return result;

});



// written by ganeshr
exports.save =  co.wrap(function*(examcrudeapp) {
    
    let requestStatus = {
		status : false
    }

    if(examcrudeapp === undefined || examcrudeapp == null || examcrudeapp.toString().trim() == ""){
    	requestStatus.reason = "Invalid object";
    	return requestStatus;
    }
    else if(examcrudeapp._id === undefined || examcrudeapp._id == null || examcrudeapp._id.toString().trim() == ""){
    	examcrudeapp._id = helperService.getGUID();
    }


    try {

        let db = yield coDal.getNoSqlDB();
	    
	    let result = yield db.examcrude.insert(examcrudeapp);

	    requestStatus.status = true;

    } catch (err) {
        console.error(err.stack);
        requestStatus.reason = err.stack;
    }

	return requestStatus;

});

// written by ganeshr
exports.remove =  co.wrap(function*(id) {
    
    let requestStatus = {
        status : false
    }

    if(id === undefined || id == null || id.toString().trim() == ""){
        requestStatus.reason = "Invalid id Value";
        return requestStatus;
    }


    try {

        let db = yield coDal.getNoSqlDB();
        
        let result = yield db.examcrude.remove({"_id" : id});

        requestStatus.status = true;

    } catch (err) {
        console.error(err.stack);
        requestStatus.reason = err.stack;
    }

    return requestStatus;

});


// written by ganesh        
exports.udpate =  co.wrap(function*(examobject) {
    
    console.log(examobject);
    let requestStatus = {
        status : false
    }

    if(examobject === undefined || examobject == null || examobject.toString().trim() == ""){
        requestStatus.reason = "Invalid object";
        return requestStatus;
    }
    else if(examobject._id === undefined || examobject._id == null || examobject._id.toString().trim() == ""){
        requestStatus.reason = "_id not set";
        return requestStatus;
    }


    try {

        let db = yield coDal.getNoSqlDB();
        
        let result = yield db.examcrude.update(
            {"_id":examobject._id},examobject
        );

        requestStatus.status = true;

    } catch (err) {
        console.error(err.stack);
        requestStatus.reason = err.stack;
    }

    return requestStatus;

});

