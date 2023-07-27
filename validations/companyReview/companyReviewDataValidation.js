const companyReviewValidationSchema = require('../../validations/companyReview/companyReviewValSchema') // ! Review Validation Schema .

module.exports = {
    registerReview: async (req, res, next) => {
        // ! It Validate the data .
        const value = await companyReviewValidationSchema.registerCompany.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next() // ? allow to Go to next function .
        }
    }
}