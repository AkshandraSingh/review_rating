const userValidation = require('../../validations/user/userValSchema')

module.exports = {
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
    resetPassword: async (req, res, next) => {
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
    registerCompany: async (req, res, next) => {
        const value = await userValidation.registerCompany.validate(req.body, { abortEarly: false })
        const value2 = await userValidation.registerCompany.validate(req.body, { abortEarly: false })
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