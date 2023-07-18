const mongoose = require('mongoose');
const logger = require('../utils/logger')

mongoose.connect(process.env.URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Database connected')
    logger.log("info","MongoDB is Connected")
})

mongoose.connection.on('error', () => {
    console.log('Database error')
    logger.log("error","Mongoose Connection Error!! ")
})