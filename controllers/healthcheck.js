const reponseHandler = require('../utils/ResponseHandler')
const messages = require('../utils/messages').MESSAGES
/**
 * This is api for Health Check of the system itself which will return a constant message 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function healthCheckApi(req,res,next){
    reponseHandler.SuccessfulPostData(req,res,messages.OK)
}

module.exports = { healthCheckApi}