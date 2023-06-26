const mongoose = require('mongoose');
let companySchema = new mongoose.Schema({
    company_Name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    FoundedOn: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
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