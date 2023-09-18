const companyReviewSchema = require('../models/companyReviewSchema'); // Import the review schema (used in all APIs).

// Create Review API
const createReview = async (req, res) => {
    try {
        const schema = new companyReviewSchema(req.body); // Get data from the request body (e.g., from Postman).
        const review = await schema.save(); // Save the data in the database.

        res.status(202).json({
            success: true,
            message: "Your Review is Successfully Created",
            Data: review, // Show the created review.
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Update Review API
const updateReview = async (req, res) => {
    try {
        // Get the review ID from URL params and data from the request body for updating.
        const reviewData = await companyReviewSchema.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true, // Return the updated data.
            }
        );

        if (reviewData) {
            res.status(200).send({
                success: true,
                message: 'Review Updated Successfully',
                updateReview: reviewData, // Show the updated data.
            });
        } else {
            res.status(404).send({
                success: false,
                message: 'Review Not Found', // If the review is not found.
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
        });
    }
};

// Delete Review API
const deleteReview = async (req, res) => {
    try {
        const id = req.params.id; // Get the review ID from URL params.
        const deletedReview = await companyReviewSchema.findByIdAndDelete(id); // Find data by ID and delete it.

        res.status(202).send({
            success: true,
            message: 'Review Deleted Successfully',
            Data: deletedReview, // Show the deleted data.
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error: error,
        });
    }
};

module.exports = { createReview, deleteReview, updateReview };
