const express = require('express');
const company = require('../controller/companyController') // ? Company Controller File
const { userAuthentication } = require('../middlewares/authToken') // ? For Checking Token is Correct or Not
const { registerCompanyVal } = require('../validations/company/companyDataVal') // ? Validation For Creating Company
const { upload } = require('../middlewares/companyImageStorage') // ? For uploading File

const router = express.Router();

// ? Create a Company Route
router.post('/createCompany', upload.single("profilePic"), userAuthentication, registerCompanyVal, company.createCompany)
// ? List Company Route 
router.get('/listCompany', userAuthentication, company.companyList)
// ? Details Company Route
router.get('/detailsCompany/:id', userAuthentication, company.companyDetails)
// ? Sort Company Route
router.get('/sortCompany', userAuthentication, company.sortCompany)
// ? Search Company Route
router.get('/searchCompany/:letter', userAuthentication, company.searchCompany)

module.exports = router