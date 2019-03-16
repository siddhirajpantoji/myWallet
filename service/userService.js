/**
 * Services to be included are 1. Login, 2. Reset Password 3. Create user 4. Update User 
 */
const user_messages = require('../utils/messages').USER_MESSAGES
const cryptoUtils  = require('../utils/cryptoUtils')

function login(userLoginReq, callback){
    console.log("In Login service ")
    userLoginReq.password= cryptoUtils.hashPassword(userLoginReq.password)
    //var compulsaryFields = ["username", "password"];
    // DB call oevr here
    // JWT Token  over here 
    callback( null, userLoginReq);
  
}

function createUser( userCreateReq, callback){

}

function updatePassword( passwordUpdateReq, callback){

}

function updateUser( userUpdateReq, callback){

}

module.exports = {login,createUser,updatePassword, updateUser}