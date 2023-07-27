const mongoose = require('mongoose'); // ? For Connecting MongoDB .
const logger = require('../utils/logger') // ! For Saveing Connection Information .

mongoose.connect(process.env.URL, { useNewUrlParser: true });

mongoose.connection.on('connected', () => { // ! if MongoDb is Successful Connected .
    console.log('Database connected')
    logger.log("info","MongoDB is Connected")
})

mongoose.connection.on('error', (err,res) => { // ! if There was an Error in Connecting MongoDB .
    console.log('Database error')
    console.log(err)
    logger.log("error","Mongoose Connection Error!! ")
})
// * It Require in Index File ( Main Server)
