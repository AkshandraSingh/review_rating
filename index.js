require('dotenv').config();
require('./config/modelConfig')
let express = require('express');
let commanRouter = require('./routes/mainRouter')
const logger = require('./utils/logger')

let app = express();
const HOST = "localhost";
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use('/', commanRouter);

const server = app.listen(PORT, () => {
    console.log('Server Is Running ❤')
    console.log(`PORT: ${process.env.PORT}`)
    logger.info(`Server Started and Running on http://${HOST}:${PORT}`)
})
module.exports = server
