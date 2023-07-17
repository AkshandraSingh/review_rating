require('dotenv').config();
require('./config/modelConfig')
let express = require('express');
let commanRouter = require('./routes/mainRouter')

let app = express();

app.use(express.json());
app.use('/', commanRouter);

app.listen(process.env.PORT, () => {
    console.log('Server Is Running ❤')
    console.log(`PORT: ${process.env.PORT}`)
})
