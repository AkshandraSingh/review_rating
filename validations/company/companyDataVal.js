const companyValidation = require('../../validations/company/companyValSchema') // ? Validation Schema

module.exports = {
    registerCompanyVal: async (req, res, next) => {
        // ! It Verify the validation is user enter correct Values.
        const value = await companyValidation.registerCompany.validate(req.body, { abortEarly: false })
        if (value.error) {
            return res.status(403).json({
                sucess: false,
                message: value.error.details[0].message
            })
        } else {
            next() // ! It allows to Go in Next Function
        }
    }
}