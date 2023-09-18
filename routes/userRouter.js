const express = require('express');
const userController = require('../controller/userController');
const { registerUserValidation } = require('../validations/user/userDataVal'); // Validation for user registration
const { loginUserValidation } = require('../validations/user/userDataVal'); // Validation for user login (UserEmail and UserPassword)
const { resetPasswordValidation } = require('../validations/user/userDataVal'); // Validation for resetting the password (New Password and Confirm Password)
const { upload } = require('../middlewares/userImageStorage');

const router = express.Router();

// Create User API
router.post('/create', upload.single('profilePic'), registerUserValidation, userController.createUser);
// Login User API
router.post('/login', loginUserValidation, userController.userLogin);
// Sending Email For Reset Password Link API
router.post('/emailSend', userController.sendUserDataPasswordEmail);
// Reset Password API
router.post('/resetpassword/:id/:token', resetPasswordValidation, userController.userResetPassword);

module.exports = router;
