const companyReviewSchema = require('../models/companyReviewSchema') // ? Schema of Review (That use in all API) .

// * Create Riview API 😀
const createReview = async (req, res) => {
    let schema = new companyReviewSchema(req.body) // ! Takeing Data From Postman Body
    try {
        let review = await schema.save() // ? Save the Data in Database .
        res.status(202).json({
            sucess: true,
            message: "Your Review is Successfully Created",
            Data: review, // ? Show Review that Create .
        })
    }
    catch (err) {
        res.status(500).json({
            sucess: false,
            message: err.message,
        })
    }
}

// * Update Review API 😉
let updateReview = async (req, res) => {
    try {
        // ! Takeing Id form Params (URL) and data from Body (Because Updation from id) .
        const reviewData = await companyReviewSchema.findByIdAndUpdate(req.params.id, req.body); // ! Finding Data and Update .
        if (reviewData) {
            res.status(200).send({
                success: true,
                message: 'Review Updated Successfully',
                updateReview: reviewData, // ? Show Data in Body .
            })
        } else {
            res.status(404).send({
                success: false,
                message: 'Review Not Found', // ! if Review Not Found .
            })
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error
        })
    }
}

// * Delete Review API 👍 
let deleteReview = async (req, res) => {
    try {
        let id = req.params.id // ! Taking Data from URL .
        let deleteReview = await companyReviewSchema.findByIdAndDelete(id, req.body) // ! Find data by id and Delete the Data .
        res.status(202).send({
            success: true,
            message: 'Review Deleted Successfully',
            Data: deleteReview // ? Show the Deleted Data .
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
