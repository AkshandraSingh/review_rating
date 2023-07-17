const express = require('express');
const {createReview,updateReview,deleteReview}= require(
    "../controller/companyReviewController"
)
const {registerReview} = require('../validations/companyReview/companyReviewDataValidation')

const router = express.Router();

router.post('/createreview',registerReview,createReview)
router.patch('/updatereview/:id',registerReview,updateReview)
router.delete('/deletereview/:id',deleteReview)

module.exports = router
