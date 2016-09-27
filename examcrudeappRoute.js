/**
 * Created by ganeshr.
 */
'use strict'
let co = require('co');
let joi = require('joi');
let JWT   = require('jsonwebtoken');
let configHelper = require('./../../../../JOS/configHelper');
let index = require('./../../index');
let examcrudeappService = require("./../../services/sExamcrudeapp/examcrudeappService");

let getOneExamcrudeappRoute = {
    method: "GET", path: index+"/examcrudeapp/{id}", config: {
        auth: false,
        description: 'This API will return data of examcrudeapp having provided id',
        notes: 'ganeshr did not put any notes for this API',
        tags: ['examcrudeapp','tag1', 'tag2'],
        validate: {
            params: {
                    id: joi.string().required()
            },
            failAction: function (request, reply, source, error) {
                let key = "errorMessages:examcrudeapp:"+error.output.payload.validation.keys[0];
                error.output.payload.message = configHelper.getConfig(key);
                return reply(error);
            }
        }
    },
    handler: function(request, reply) {
        co(function* () {
            try {
            //put your logic here
            
                let id = request.params.id;
                let result = yield examcrudeappService.getOne(id);
                console.log(JSON.stringify(result));
                //Fetch data using id and send back as a reply
                reply(result);
            }catch (e) {
                console.error(e.stack);
                reply({text: 'error'});
            }
        });
    }
};


//written by ganeshr

let getAllExamcrudeappRoute = {
    method: "GET", path: index+"/examcrudeapp", config: {
        auth: false,
        description: ' get all data',
        notes: 'ganeshr did not put any notes for this API ',
        tags: ['examcrudeapp','tag1', 'tag2'],
    },
    handler: function(request, reply) {
        co(function* () {
            try {

                //Fetch all data and send back as a reply
                //at least put some intellegence here

                let list = yield examcrudeappService.getList();
                reply(list);
            }catch (e) {
                console.error(e.stack);
                reply(e);
            }
        });
    }
};


//written by ganeshr
let saveExamcrudeappRoute = {
    method: "POST", path: index+"/examcrudeapp", config: {
        auth: false,
        description: 'This API saves examcrudeapp information',
        notes: 'ganeshr did not put any notes for this API ',
        tags: ['examcrudeapp','tag1', 'tag2']
       /* validate: {
            payload: {
                    _id: joi.string().required()
            },
            failAction: function (request, reply, source, error) {
                error.output.payload.message = configHelper.getConfig(error.output.payload.validation.keys[0]);
                return reply(error);
            }

        }*/
    },
    handler: function(request, reply) {
        co(function* () {
            try {
                
                let examcrudeapp = request.payload.examcrudeapp;
                let result = yield examcrudeappService.save(examcrudeapp);
                console.log(JSON.stringify(result));
                reply("ok");
            }catch (e) {
                console.error(e.stack);
                reply({text: 'error'});
            }
        });
    }
};


//written by ganeshr
let deleteExamcrudeappRoute = {
    method: "POST", path: index+"/delExamcrudeapp", config: {
        auth: false,
        description: 'This API deletes Examcrudeapp information',
        notes: 'ganeshr did not put any notes for this API ',
        tags: ['examcrudeapp','delete', 'tag2']
       /* validate: {
            payload: {
                    _id: joi.string().required()
            },
            failAction: function (request, reply, source, error) {
                error.output.payload.message = configHelper.getConfig(error.output.payload.validation.keys[0]);
                return reply(error);
            }

        }*/
    },
    handler: function(request, reply) {
        co(function* () {
            try {
                
                let id = request.payload.id;
                let result = yield examcrudeappService.remove(id);
                console.log(JSON.stringify(result));
                reply("ok");
            }catch (e) {
                console.error(e.stack);
                reply({text: 'error'});
            }
        });
    }
};


//written by ganeshr
    let updateupdateexamRoute = {
    method: "POST", path: index+"/updateexam", config: {
        auth: false,
        description: 'This API updates updateexam object',
        notes: 'ganeshr did not put any notes for this API ',
        tags: ['updateexam','tag1', 'tag2']
    },
    handler: function(request, reply) {
        co(function* () {
            try {
            
                let updateexamObject = request.payload.examcrudeappObject;
                let result = yield examcrudeappService.udpate(updateexamObject);
                reply("data replaced");
            } catch (e) {
                console.error(e.stack);
                reply({text: 'error'});
            }
        });
    }
};

module.exports = [getOneExamcrudeappRoute,getAllExamcrudeappRoute,saveExamcrudeappRoute,deleteExamcrudeappRoute,updateupdateexamRoute];


