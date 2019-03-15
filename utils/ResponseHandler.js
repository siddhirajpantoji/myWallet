
const messages = require('./messages').MESSAGES
function SuccessfulPostData(request, response, data) {
    response.writeHead(200, { 'Content-type': 'application/json' });
    if (data) {
        //response.end(JSON.stringify(Object.values(msg.rows[0])[0]));
        //console.log(data)
        var output = {
            "code": 200,
            "message": messages.OK,
            "data": data
        }
        response.end(JSON.stringify(output));
    }
    else {
        response.end();
    }
}
function Error500(request, response, err) {
    response.status(500).send(err)
    // response.writeHead(500, 'Internal server error!', { 'Content-type': 'application/json' });
    // response.write(JSON.stringify({ error: `Internal server error: ${err}` }));
    // response.end();
}

function Error400(request, response, err) {
    
    response.writeHead(400, 'Bad request!', { 'Content-type': 'application/json' });
    response.write(JSON.stringify({ error: `Bad request: ${err}` }));
    response.end();
}

function ERRORGeneric(req,res, status, message ){
    return res.status(status).json( message);
}
module.exports = {
    SuccessfulPostData, Error400, Error500, ERRORGeneric
}