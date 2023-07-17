const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');

const companySchema = {

    registerCompany: joi.object({
        companyName: joi
            .string()
            .min(2)
            .max(25)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        companyLocation: joi
            .string()
            .min(2)
            .max(25)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        companyCity: joi
            .string()
            .min(2)
            .max(25)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            }),
        companyState: joi
            .string()
            .min(2)
            .max(25)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            }),
    })

}
module.exports = companySchema