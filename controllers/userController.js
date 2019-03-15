const { body , validationResult} = require('express-validator/check')
const userService = require('../service/userService')
const responseHandler = require('../utils/ResponseHandler')

/**
 * This function has all responsibilities for validations 
 * @param {*} method 
 */
function validate(method ){
    
    switch(method){
        case 'login':{
            return [
                body('username', "userName compulsary ").isEmail(),
                body('password', 'Invalid email').exists()
            ]
        }
    }
}

/**
 * Function to handle login functionality with username and password 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function login ( req,res, next ){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return  responseHandler.ERRORGeneric(req,res,400,errors.array())
    }
    console.log("Inside Controller ")
    var userLoginReq = {
        username:req.body.username,
        password: req.body.password
    }
    userService.login(userLoginReq, function(err,data){
        if( err){
            responseHandler.ERRORGeneric(req,res,403, "Unable to Login ")
        }
        else{
            responseHandler.SuccessfulPostData(req,res,data);
        }
    })
}
module.exports = {validate, login}