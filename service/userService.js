/**
 * Services to be included are 1. Login, 2. Reset Password 3. Create user 4. Update User 
 */
const messages = require('../utils/messages')
const cryptoUtils  = require('../utils/cryptoUtils')
const userDao = require('../dao/UserDao')
function login(userLoginReq){
    return new Promise((resolve,reject)=>{
        console.log("In Login service ")
        var failResponse = {
            status : 403,
            message:  messages.MESSAGES.ERR_403
        }
        userLoginReq.password= cryptoUtils.hashPassword(userLoginReq.password)
        userDao.login(userLoginReq).then(loginData=>{
            loginData.last_login = new Date();
            loginData.password = undefined;
            loginData.token = undefined
            cryptoUtils.createJWTTokenForData(loginData).then(token=>{
                loginData.token = token;
                // Update Token over here 
                userDao.updateTokenAndLogin(loginData).then(data=>{
                    resolve({token:loginData.token })
                }).catch(err=>{
                    console.error(JSON.stringify(err))
                    console.log(" Token Update  error ")
                    failResponse.err= err;
                    reject(failResponse)
                })
                
            }).catch(err=>{
                console.log(" Error for JWT Token ")
                failResponse.err= err;
                reject(failResponse)
            })
        }).catch(err=>{
            console.log(" Login DB Call  ")
            failResponse.err= err;
            console.log(err.stack)
            reject(failResponse)
        })
    })
      
}

function createUser( userCreateReq){
    return new Promise(( resolve,reject)=>{
        userCreateReq.password = cryptoUtils.hashPassword(userCreateReq.password);
        userDao.createUser(userCreateReq).then(userData=>{
            //userData = userData.rows[0];
            userData.password = undefined
            userData.token = undefined;
            resolve(userData);
        }).catch(err=>{
            failResponse = {
                status:500,
                message : messages.MESSAGES.ERR_500,
                err:err
            }
            reject(failResponse);
        })
    })
    
}

function updatePassword( passwordUpdateReq, callback){

}

function updateUser( userUpdateReq, callback){

}

function checkIfUserExists(username){
    //console.log("Check if user exists "+ username)
    return new Promise((resolve,reject)=>{
        userDao.checkIfUserExists(username).then((data)=>{
            resolve(data.rows[0]);
        }).catch(err=>{
            var return1 = {
                status:500,
                message: messages.MESSAGES.ERR_500,
                err:err
            }
            reject(return1);
        })
    })
}
module.exports = {login,createUser,updatePassword, updateUser, checkIfUserExists}