const mongoose = require('mongoose');
let companySchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reateing: {
        type: String,
        required: true
    },
    isactive: {
        type: Boolean,
        required: true,
        default: true,
    },
})
commentSchema = set('timestamp',true)