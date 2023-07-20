const express = require('express');
const {createReview,updateReview,deleteReview}= require(
    "../controller/companyReviewController"
)
const {registerReview} = require('../validations/companyReview/companyReviewDataValidation')

const router = express.Router();
// Create Review url to Run 
router.post('/createreview',registerReview,createReview)
// Update Review url to Run 
router.patch('/updatereview/:id',registerReview,updateReview)
// Delete Review url to Run 
router.delete('/deletereview/:id',deleteReview)

module.exports = router
