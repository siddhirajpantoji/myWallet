// This is main file for express module 

const express = require('express')
const bodyParser = require('body-parser');
const  heathCheckRouter = require('./routers/healthRouter')
const userRouter = require('./routers/userRouter')
const expressValidator = require('express-validator')
app = new express();
app.use(bodyParser.json());
app.use(expressValidator())
app.use('/',heathCheckRouter);
app.use('/user',userRouter);

module.exports = app;