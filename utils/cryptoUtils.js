const crypto = require("crypto");

const jwt = require('jsonwebtoken')

function hashPassword (password ){
    const hash = crypto.createHash('sha256');
    hash.update(password);
    return hash.digest('hex');
}

function createJWTTokenForData(data){
    return new Promise((resolve,reject)=>{
        try{
            var token = jwt.sign({user:data},process.env.SECRET_KEY,{
                expiresIn:process.env.JWT_TOKEN_EXPIRY
            })
            token = encryptData(token);
            resolve(token);
        }
        catch(err){
            reject(err)
        }
    })
    
}

function verifyJWTToken(tokenToVerify){
    return new Promise((resolve,reject)=>{
        tokenToVerify = decryptData(tokenToVerify);
        jwt.verify(tokenToVerify,process.env.SECRET_KEY, function(err,decodedData){
            if( err){
                reject(err)
            }
            else{
                resolve(decodedData)
            }
        })
    })
}
function encryptData(data){
  //  console.log(data);
    var mykey = crypto.createCipher('aes-128-cbc', process.env.SECRET_KEY);
    var mystr = mykey.update(data, 'utf8', 'hex');
    mystr += mykey.final('hex');
    return mystr;
 }

function decryptData(data){
    var mykey = crypto.createDecipher('aes-128-cbc', process.env.SECRET_KEY);
    var mystr = mykey.update(data, 'hex', 'utf8');
    mystr += mykey.final('utf8');
    return mystr;
 }
module.exports = {hashPassword , createJWTTokenForData , verifyJWTToken}
