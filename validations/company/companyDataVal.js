const userValidation = require('../../validations/company/companyValSchema')

module.exports = {
    registerCompany: async (req, res, next) => {
        // It Verify the validation is user enter correct Values.
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