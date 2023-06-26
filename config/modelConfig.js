const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/reviewRating', { useNewUrlParser: true});

mongoose.connection.on('connected',()=>{
    console.log('Database connected')
})

mongoose.connection.on('error',()=>{
    console.log('Database error')
})