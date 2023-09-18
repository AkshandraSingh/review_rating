const express = require('express');
const { createReview, updateReview, deleteReview } = require(
    "../controller/companyReviewController"
)
const { registerReview } = require('../validations/companyReview/companyReviewDataValidation') // ! Review Validation .

const router = express.Router();

// * Create Review url to Run 
router.post('/createReview', registerReview, createReview)
// * Update Review url to Run 
router.patch('/updateReview/:id', registerReview, updateReview)
// * Delete Review url to Run 
router.delete('/deleteReview/:id', deleteReview)

module.exports = router
