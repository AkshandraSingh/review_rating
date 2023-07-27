const joi = require('joi') // ? For Validation

const companyReviewValidationSchema = {
    // ! Validation For Creating Company
    registerCompany: joi.object({
        companyReviewSubject: joi
            .string()
            .max(21)
            .min(3)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        companyReview: joi
        .string()
        .max(100)
        .min(5)
        .message({
            "string-min": "{#lable} should be at least {#limit} characters",
            "string-man": "{#lable} should be at least {#limit} characters",
        })
        .required(),
        companyReviewReateing: joi
        .string()
        .min(1)
        .max(5)
        .message({
            "string-min": "{#lable} should be at least {#limit} characters",
            "string-man": "{#lable} should be at least {#limit} characters",
        })
        .required(),
        userId: joi
        .string()
        .required(),
        companyId: joi
        .string()
        .required()
    })
}

module.exports = companyReviewValidationSchema
