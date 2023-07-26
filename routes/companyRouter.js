const express = require('express');
const company = require('../controller/companyController')
const { userAuthetication } = require('../middlewares/authToken')
const { registerCompanyVal } = require('../validations/company/companyDataVal')
const { upload } = require('../middlewares/companyImageStroge')

const router = express.Router();

router.post('/createcompany', upload.single("profilePic"), userAuthetication, registerCompanyVal, company.createCompany)
router.get('/listcompany', company.companyList)
router.get('/detailscompany/:id', company.companyDetails)
router.get('/sortcompany', company.sortCompany)
router.get('/searchcompany/:letter', company.searchCompany)

module.exports = router
