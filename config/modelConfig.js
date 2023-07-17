const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://IshanSingh:ishan_singh1234@cluster0.ti1jqsc.mongodb.net/", { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('Database connected')
})

mongoose.connection.on('error', () => {
    console.log('Database error')
})