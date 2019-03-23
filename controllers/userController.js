const { body , validationResult} = require('express-validator/check')
const userService = require('../service/userService')
const responseHandler = require('../utils/ResponseHandler')
const messages = require('../utils/messages').USER_MESSAGES

/**
 * This function has all responsibilities for validations 
 * @param {*} method 
 */
function validate(method ){
    
    switch(method){
        case 'login':{
            return [
                body('username').exists().withMessage(messages.USERNAME_COMPULSARY).isEmail().withMessage( messages.USERNAME_MUST_BE_EMAIL ),
                body('password').exists().withMessage( messages.PASSWORD_COMPULSARY),
            ]
        }
        case 'createUser':{
            return [
                body('username').exists().withMessage(messages.USERNAME_COMPULSARY).isEmail().withMessage(messages.USERNAME_MUST_BE_EMAIL).
                custom( value =>{
                    return new Promise((resolve,reject)=>{
                        userService.checkIfUserExists(value).then(user=>{
                            console.log(user)
                            if( user){
                                reject(messages.USERNAME_IN_USE);
                            }
                            else{
                                resolve()
                            }
                        }).catch(err=>{
                            console.error(err);
                            reject(err)
                        })
                    })
                }),
                body('password').exists().withMessage(messages.PASSWORD_COMPULSARY).not().isIn(['123','god','password']).withMessage( messages.COMMON_PASSWORD)
                    .isLength({min:5}).withMessage(messages.PASSWORD_LENGTH).matches(/\d/).withMessage(messages.PASSWORD_NUMBER_REQ),
                body('first_name').exists().withMessage(messages.FIRST_NAME_REQ),
                body('last_name').exists().withMessage(messages.LAST_NAME_REQ),
                body('passwordConfirmation').custom((value, { req }) => {
                    console.log(value );
                    console.log(req.body.password)
                    console.log(value !== req.body.password)
                    
                    if (value !== req.body.password) {
                      throw new Error('Password confirmation does not match password');
                    }else{
                        return true;
                    }
                  })
            ]
        }
        case 'updateUser':{
            return [
                body('username').exists().withMessage(messages.USERNAME_COMPULSARY).isEmail().withMessage(messages.USERNAME_MUST_BE_EMAIL).
                custom( value =>{
                    return new Promise((resolve,reject)=>{
                        userService.checkIfUserExists(value).then(user=>{
                            console.log(user)
                            if( user){
                                reject(messages.USERNAME_IN_USE);
                            }
                            else{
                                resolve()
                            }
                        }).catch(err=>{
                            console.error(err);
                            reject(err)
                        })
                    })
                }),
                body('first_name').exists().withMessage(messages.FIRST_NAME_REQ),
                body('last_name').exists().withMessage(messages.LAST_NAME_REQ),
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
function login ( req,res ){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return  responseHandler.ERRORGeneric(req,res,400,errors.array())
    }
    console.log("Inside Controller ")
    var userLoginReq = {
        username:req.body.username,
        password: req.body.password
    }
    userService.login(userLoginReq).then(data=>{
        console.log(data)
        responseHandler.SuccessfulPostData(req,res,data);
    }).catch(err=>{
        responseHandler.ERRORGeneric(req,res,err.status, err);
    })
}

function createUser(req, res ){
    console.log("Entered Create User ")
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return  responseHandler.ERRORGeneric(req,res,400,errors.array())
    }
    console.log("Create User Requests  ")
    var createUserReq = {
        username:req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,  
        last_name: req.body.last_name,
    }
    userService.createUser(createUserReq).then(data=>{
        responseHandler.SuccessfulPostData(req,res,data);
    }).catch(err=>{
        responseHandler.ERRORGeneric(req,res,err.status, err);
    })
}
module.exports = {validate, login, createUser}