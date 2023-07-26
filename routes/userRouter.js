let express = require('express');
let userController = require('../controller/userController')
let { registerUserValidation } = require('../validations/user/userDataVal') // ? It is a Vaildation For When User Create
let { loginUserValidation } = require('../validations/user/userDataVal')// ? It is a Vaildation For When User Login (UserEmail and UserPassword)
let { resetPasswordValidation } = require('../validations/user/userDataVal') // ? It is a Vaildation For When User Reset Password (New Password and Comfirm Password)
const { upload } = require('../middlewares/userImageStorage')

let router = express.Router()

router.post('/create', upload.single("profilePic"), registerUserValidation, userController.createUser)
router.post('/login', loginUserValidation, userController.userLogin)
router.post('/emailsend', userController.sendUserDataPasswordEmail)
router.post('/resetpassword/:id/:token', resetPasswordValidation, userController.userResetPassword)

module.exports = router 
