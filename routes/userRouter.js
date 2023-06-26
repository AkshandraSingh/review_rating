let express = require('express');

let user = require('../controller/userController')

let router = express.Router()

router.post('/createuser', user.createUser)

module.exports = router