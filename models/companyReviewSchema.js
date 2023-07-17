const mongoose = require('mongoose');

let companyReviewSchema = new mongoose.Schema({
    companyReviewSubject: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    companyId: {
        type: mongoose.Types.ObjectId,
        ref: 'company',
        required: true
    },
    companyReview: {
        type: String,
        required: true
    },
    companyReviewReateing: {
        type: String,
        required: true
    },
    isactive: {
        type: Boolean,
        default: true,
    },
})
companyReviewSchema.set('timestamps',true)
module.exports = mongoose.model('review',companyReviewSchema)
