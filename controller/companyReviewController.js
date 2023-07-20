const companyReviewSchema = require('../models/companyReviewSchema')

const createReview = async (req, res) => {
    let schema = new companyReviewSchema(req.body)
    try {
        let review = await schema.save()
        res.status(200).json({
            sucess: true,
            message: "Your review was successfully created",
            Data: review,
        })
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            message: err.message,
        })
    }
}

let updateReview = async (req, res) => {
    try {
        console.log(req.body)
        const reviewData = await companyReviewSchema.findByIdAndUpdate(req.params.id, req.body);
        if (reviewData) {
            res.status(202).send({
                success: true,
                message: 'Review Updated Successfully',
                updateReview: reviewData,
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Review Not Found',
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
}

let deleteReview = async (req, res) => {
    try {
        let id = req.params.id
        let deleteReview = await companyReviewSchema.findByIdAndDelete(id, req.body)
        res.status(202).send({
            success: true,
            message: 'Review Deleted Successfully',
            Data: deleteReview
        })
    }
    catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
}

module.exports = { createReview, deleteReview, updateReview }
