// This require is to be first before loading any other class in 
require('dotenv').config()

const app  = require('./app');
const userDao = require('./dao/UserDao')

const port = process.env.PORT;
//console.log(process.env.DB_USER)
//global.process.env.DB_USER = process.env.DB_USER

// //console.log(process.env);
userDao.createUserTable().then((data)=>{
    console.log("table Creaeted ")
    console.log(data)
}).catch((error)=>{
    console.error(error.stack)
})
app.listen(port,function(){
    console.log("Listenng on port "+  port)
});

