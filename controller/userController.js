let userSchema = require('../models/userSchema')
let bcrypt = require('bcrypt') // ? For Incrypt the Password 
const jwt = require('jsonwebtoken') // ? JWT is use to Genrate a Token
const { transporter } = require('../service/emailService') // ? Its is a Transpoter for Sending Email
const { unlinkSync } = require('fs'); // ? FS Stands For File System

// ? This function is used to Create a User ✌
let createUser = async (req, res) => {
    const userData = new userSchema(req.body)
    const salt = await bcrypt.genSalt(10) // ! It is Algorithm For Genrating Incrypt the Password (How many Character) .
    try {
        const userExits = await userSchema.findOne({ // ? It Chek User Exist Or Not (With User Email)
            userEmail: req.body.userEmail,
        });
        if (userExits) {
            req.file ? unlinkSync(req.file.path) : null; // ! Deleating Unnecessary Profile Pic That Allready Store in Folder .
            return res.status(401).send({
                success: false,
                message: 'User Allready Exists With This Email ',
            });
        }
        else {
            const filePath = `/upload/${req.file.filename}`;
            userData.profilePic = filePath;
            userData.userPassword = await bcrypt.hash(req.body.userPassword, salt) // ? To Convert Password into Incrupt From .
            const user = await userData.save()
            res.status(201).json({
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

// ? This function is used to Login a User 😁
let userLogin = async (req, res) => {
    try {
        const userData = await userSchema.findOne({ userEmail: req.body.userEmail })
        if (userData) {
            const hashpassword = await bcrypt.compare(req.body.userPassword, userData.userPassword) // ? It Compare The New Password and Password that Sore in DataBase! .
            if (userData && hashpassword) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
                    expiresIn: "15m",
                }) // ! It Generate a Token That Expire in 15 Minutes .
                res.status(200).send({
                    success: true,
                    message: 'Login Successful ✔',
                    token: token
                })
            }
            else {
                res.status(401).send({
                    success: false,
                    message: 'Email or Password is Incorrect '
                })
            }
        }
        else { // ? It Give This Message When Email is Not Present in DataBase .
            res.status(403).send({
                success: false,
                message: 'Email Not Exist '
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

// ? This function is used to send email ✌
const sendUserDataPasswordEmail = async (req, res) => {
    const { userEmail } = req.body
    try {
        const userData = await userSchema.findOne({ // ! It Check The Email is Present in DataBase or Not .
            userEmail: req.body.userEmail
        });
        if (userData != null) {
            const secret = userData._id + process.env.SECRET_KEY;
            const token = jwt.sign({ userID: userData._id }, secret, { expiresIn: "20m" })
            const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}` // ! This Link is Geven By Frontend Dev
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

// ? Reset Password API 😀
const userResetPassword = async (req, res) => {
    const { id, token } = req.params; // ! It Takes Data From Params (Means URL) .
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userSchema.findById(id);
        if (checkUser != null) {
            const secretKey = checkUser._id + process.env.SECRET_KEY;
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { userPassword: bcryptPassword }, // ? It is a MongoDB Query To Update the Password .
                });
                res.status(201).json({
                    success: true,
                    message: "Password Updated Successfully",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Password and ConfirmPassword does not match",
                });
            }
        } else { // ? It Give This Message When Email is Not Present in DataBase .
            res.status(403).json({
                success: false,
                message: `Please Enter Valid Email`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occur : ${error.message}`,
        });
    }
};
// * All functions in this module
module.exports = {
    createUser,
    userLogin,
    sendUserDataPasswordEmail,
    userResetPassword
};
