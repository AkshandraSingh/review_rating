let userSchema = require('../models/userSchema')
let bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const { transporter } = require('../service/emailService')
const {unlinkSync} = require('fs');

// This function is used to Create a User
let createUser = async (req, res) => {
    const userData = new userSchema(req.body)
    const salt = await bcrypt.genSalt(10)
    try {
        const userExits = await userSchema.findOne({
            userEmail: req.body.userEmail,
        });
        if (userExits) {
            req.file ? unlinkSync(req.file.path) : null;
            return res.status(401).send({
                success: false,
                message: 'User Allready Exists 👀',
            });
        }
        else {
            console.log(req.body)
            const filePath = `/upload/${req.file}`;
            userData.profilePic = filePath;
            userData.userPassword = await bcrypt.hash(req.body.userPassword, salt)
            const user = await userData.save()
            res.status(200).json({
                success: true,
                message: 'User has been Created ✔',
                user: user,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// This function is used to Login a User
let userLogin = async (req, res) => {
    try {
        const userData = await userSchema.findOne({ userEmail: req.body.userEmail })
        if (userData) {
            const hashpassword = await bcrypt.compare(req.body.userPassword, userData.userPassword)
            if (userData && hashpassword) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
                    expiresIn: "15m",
                })
                res.status(200).send({
                    success: true,
                    message: 'Login Successful ✔',
                    token: token
                })
            }
            else {
                res.status(401).send({
                    success: false,
                    message: 'Email or Password is Incorrect 😶'
                })
            }
        }
        else {
            res.status(401).send({
                success: false,
                message: 'Email Not Exist 👀'
            })
        }
    }
    catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
}

// This function is used to Check Token a User
let checkToken = (req, res) => {
    res.send("Your Token is Correct ✔ ")
}

// This function is used to send email
const sendUserDataPasswordEmail = async (req, res) => {
    const { userEmail } = req.body
    try {
        const userData = await userSchema.findOne({
            userEmail: req.body.userEmail
        });
        if (userData != null) {
            const secret = userData._id + process.env.SECRET_KEY;
            const token = jwt.sign({ userID: userData._id }, secret, { expiresIn: "20m" })
            const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`
            let info = await transporter.sendMail({
                from: "nameste380@gmail.com",
                to: userEmail,
                subject: "Email for user reset Password",
                html: `<a href=${link}>click on this for reset password`
            });
            return res.status(201).json({
                success: true,
                message: "Email Sent Successfully ❤",
                token: token,
                userID: userData._id
            })
        } else {
            res.status(403).json({
                success: false,
                message: "Please Enter Valid Email 👀"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occur ${error.message}`,
        });
    }
};

let userResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userSchema.findById(id);
        if (checkUser != null) {
            const secretKey = checkUser._id + process.env.JWT_SECRET_KEY
            // jwt.verify(token, secretKey)
            if (newPassword == confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { userPassword: bcryptPassword },
                });
                res.status(200).json({
                    success: true,
                    message: "Password Updated Successfully ✔"
                })
            } else {
                res.status(403).json({
                    success: false,
                    message: "New Password Does not Match With Confirmation 🤦‍♂️"
                })
            }
        } else {
            res.status(403).json({
                success: false,
                error: "Email user is not Found 🙂"
            })
        }
    }
    catch (error) {
        res.status(403).json({
            screen: false,
            error: error.message,
        })
    }
}

// All functions in this module
module.exports = {
    createUser,
    userLogin,
    checkToken,
    sendUserDataPasswordEmail,
    userResetPassword
};