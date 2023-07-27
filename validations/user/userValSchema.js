const joi = require('joi') // ! For Validation
const { joiPasswordExtendCore } = require('joi-password'); // ! For Validation Password
const joiPassword = joi.extend(joiPasswordExtendCore);

const userSchema = { // ! Validation Schema base on User Schema .
    // ! Register Validation .
    registerUser: joi.object({
        userName: joi
            .string()
            .max(20)
            .min(3)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        userEmail: joi
            .string()
            .email()
            .min(11)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        userPassword: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(3)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only latin characters',
            })
            .required(),
        userPhone: joi
            .number()
            .integer()
            .min(1000000000)
            .max(9999999999)
            .message({
                "string-min": "{#lable} should be at least {#limit} characters",
                "string-man": "{#lable} should be at least {#limit} characters",
            })
            .required(),
        userCity: joi
            .string()
            .required(),
        userState: joi
            .string()
            .required()
    }).unknown(true),

    // ! Login Validation .
    loginUser: joi.object({
        userEmail: joi
            .string()
            .email()
            .required(),
        userPassword: joi
            .string()
    }).unknown(true),

    // ! Reset Password .
    passwordConfirm: joi.object({
        newPassword: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(3)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only latin characters',
            }),
        confirmPassword: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(3)
            .minOfUppercase(1)
            .minOfNumeric(1)
            .noWhiteSpaces()
            .onlyLatinCharacters()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
                'password.onlyLatinCharacters': '{#label} should contain only latin characters',
            })
    }),
}

module.exports = userSchema
