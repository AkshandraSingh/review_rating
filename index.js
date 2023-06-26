require('dotenv').config();

let express = require('express');

let mongoose = require('mongoose');

let userRouter = require('./routes/userRouter')

require('./config/modelConfig')

let app = express();

app.use('/',userRouter)

app.listen(process.env.PORT,()=>{
    console.log('server is running')
    console.log(`PORT: ${process.env.PORT}`)
})
