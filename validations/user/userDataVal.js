const userValidation = require('../../validations/user/userValSchema')

module.exports = {
    // ! Register User Validation is a Middleware to Validate the User Data When Creation (Base On Schema) .
    registerUserValidation: async (req, res, next) => {
        const value = await userValidation.registerUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    // ! login User Validation is a Middleware to Validate the User Data User Login (UserEmail and UserPassword) .
    loginUserValidation: async (req, res, next) => {
        const value = await userValidation.loginUser.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },

    // ! Reset Password Validation is a Middleware to Validate the User Data User Reset Password (NewPassword and Comfirm Password) .
    resetPasswordValidation: async (req, res, next) => {
        const value = await userValidation.passwordConfirm.validate(req.body, { abortEarly: false })
        const value2 = await userValidation.passwordConfirm.validate(req.body, { abortEarly: false })
        if (value.error && value2.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next()
        }
    },
}
