const app  = require('./app');
require('dotenv').config()
const port = process.env.PORT;
app.listen(port,function(){
    console.log("Listenng on port "+  port)
});