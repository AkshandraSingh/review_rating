const mongoose = require('mongoose');
let companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    companyLocation: {
        type: String,
        required: true
    },
    companyState: {
        type: String,
        required: true
    },
    companyCity: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        required: true
    },
    isactive: {
        type: Boolean,
        default: true,
    },
})
companySchema.set('timestamps', true)
module.exports = mongoose.model('company', companySchema)