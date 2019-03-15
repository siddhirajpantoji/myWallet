const messages  = require('../utils/messages').USER_MESSAGES

function validateInput (reqBody , compulsaryFields ){
    console.log(compulsaryFields)
    for(  x =0 ; x< compulsaryFields.length ; x++){

        var value =  reqBody[compulsaryFields[x]] 
        
        if( !value){
            throw new Error( compulsaryFields[x] + messages.IS_MISSING+ JSON.stringify(reqBody) )
        }
        if( value.trim().length  === 0 ){
            throw new Error( field + messages.IS_REQ +  JSON.stringify(reqBody) )
        }
    }
    return true;
}

console.log( validateInput({username:"abc"},["username"]));
module.exports = {validateInput}
