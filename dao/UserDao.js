const db = require('./db');
const queries = require('./daoQueries').QUERIES
//console.log(process.env);
function login(userLoginReq){
    var username = userLoginReq.username;
    var password = userLoginReq.password;
    return new Promise((resolve,reject)=>{
        db.query(queries.USER.LOGIN_USER,[username,password], function(err,data){
            if(err){
                reject(err)
            }
            else{
                resolve(data.rows)
            }
        })
    })
}

function createUser( userCreateReq, callback){
    return new Promise((resolve,reject)=>{
        db.query(queries.USER.CREATE_USER_RECORD,[userCreateReq.username, userCreateReq.password , userCreateReq.token , userCreateReq.last_login , userCreateReq.first_name, userCreateReq.last_name],
        function(err,data){
            commonQueryFunction(err,data,resolve,reject)
        })
    })
}

function updatePassword( passwordUpdateReq){
    return new Promise((resolve,reject)=>{
        db.query(queries.USER.CREATE_USER_RECORD,[userCreateReq.username, userCreateReq.password , userCreateReq.token , userCreateReq.last_login , userCreateReq.first_name, userCreateReq.last_name],
        function(err,data){
            commonQueryFunction(err,data,resolve,reject)
        })
    })
}

function updateUser( userUpdateReq, callback){

}

function createUserTable ( ){
    return new Promise((resolve,reject)=>{
        db.query(queries.USER.CREATE_USER_TABLE,undefined,function(err,data){
            commonQueryFunction(err,data,resolve,reject)
        })
    })
}

function updatePassword( passwordUpdate){
    
}

function commonQueryFunction ( err, data, resolve, reject){
    if(err){
        return reject(err)
    } 
    else{
        return resolve(data);
    }
}

module.exports = {
    createUserTable , login, updatePassword, updateUser, createUser
}