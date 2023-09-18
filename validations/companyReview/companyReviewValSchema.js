const joi = require('joi'); // Import Joi for validation

const companyReviewValidationSchema = {
    // Validation For Creating Company Review
    registerCompanyReview: joi.object({
        companyReviewSubject: joi
            .string()
            .max(21)
            .min(3)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            })
            .required(),
        companyReview: joi
            .string()
            .max(100)
            .min(5)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            })
            .required(),
        companyReviewRating: joi
            .string()
            .min(1)
            .max(5)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            })
            .required(),
        userId: joi
            .string()
            .required(),
        companyId: joi
            .string()
            .required()
    })
};

module.exports = companyReviewValidationSchema;
