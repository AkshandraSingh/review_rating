const joi = require('joi'); // Import Joi for validation of company data.

const companySchema = {
    // Register Company Validation
    registerCompany: joi.object({
        companyName: joi
            .string()
            .min(2)
            .max(25)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            })
            .required(),
        companyLocation: joi
            .string()
            .min(2)
            .max(25)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            })
            .required(),
        companyCity: joi
            .string()
            .min(2)
            .max(25)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            }),
        companyState: joi
            .string()
            .min(2)
            .max(25)
            .message({
                'string-min': '{#label} should be at least {#limit} characters',
                'string-man': '{#label} should be at least {#limit} characters',
            }),
    }),
};

module.exports = companySchema;
