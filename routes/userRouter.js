let express = require('express');
let user = require('../controller/userController')
let { registerUserValidation } = require('../validations/user/userDataVal')
let { loginUserValidation } = require('../validations/user/userDataVal')
let { resetPassword } = require('../validations/user/userDataVal')
const { userAuthetication } = require('../middlewares/authToken')
const {upload} = require('../middlewares/userImageStorage')

let router = express.Router()

router.post('/create',upload.single("profilePic") ,registerUserValidation, user.createUser)
router.post('/login', loginUserValidation, user.userLogin)
router.get('/check', userAuthetication, user.checkToken)
router.post('/emailsend', user.sendUserDataPasswordEmail)
router.post('/resetpassword/:id/:token', resetPassword, user.userResetPassword)
module.exports = router 