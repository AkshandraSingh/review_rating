const express = require('express');
const company = require('../controller/companyController') // ? Company Controller File
const { userAuthetication } = require('../middlewares/authToken') // ? For Checking Token is Correct or Not
const { registerCompanyVal } = require('../validations/company/companyDataVal') // ? Validation For Creating Company
const { upload } = require('../middlewares/companyImageStroge') // ? For Uploding File

const router = express.Router();

// ? Create a Company Route
router.post('/createcompany', upload.single("profilePic"), userAuthetication, registerCompanyVal, company.createCompany)
// ? List Company Route 
router.get('/listcompany', company.companyList)
// ? Details Company Route
router.get('/detailscompany/:id', company.companyDetails)
// ? Sort Company Route
router.get('/sortcompany', company.sortCompany)
// ? Search Compant Route
router.get('/searchcompany/:letter', company.searchCompany)

module.exports = router // ! Exporting Router
