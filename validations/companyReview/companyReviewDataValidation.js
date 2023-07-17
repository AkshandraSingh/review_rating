const companyReviewValidationSchema = require('../../validations/companyReview/companyReviewValSchema')

module.exports = {
    registerReview: async (req, res, next) => {
        const value = await companyReviewValidationSchema.registerCompany.validate(req.body, { abortEarly: false })
        const value2 = await companyReviewValidationSchema.registerCompany.validate(req.body, { abortEarly: false })
        if (value.error && value2.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    }
}