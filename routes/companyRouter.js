const express = require('express');
const company = require('../controller/companyController')
const { userAuthorization } = require('../middlewares/authToken')
const { registerCompany } = require('../validations/company/companyDataVal')
const { upload } = require('../middlewares/companyImageStroge')

const router = express.Router();

router.post('/createcompany', upload.single("profilePic"), company.createCompany)
router.get('/listcompany', company.companyList)
router.get('/detailscompany/:id', company.companyDetails)
router.post('/sortcompany', company.sortCompany)
router.get('/searchcompany/:letter', company.searchCompany)

module.exports = router
