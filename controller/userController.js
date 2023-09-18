const bcrypt = require('bcrypt'); // Import bcrypt for password encryption.
const jwt = require('jsonwebtoken'); // Import JWT for token generation.
const { unlinkSync } = require('fs'); // Import unlinkSync from File System.

const userSchema = require('../models/userSchema'); // Import User Schema for every API.
const { transporter } = require('../service/emailService'); // Import transporter for sending emails.

// Function to create a user.
const createUser = async (req, res) => {
    const userData = new userSchema(req.body);
    const salt = await bcrypt.genSalt(10); // Generate a salt for password hashing.

    try {
        const userExists = await userSchema.findOne({ userEmail: req.body.userEmail });
        if (userExists) {
            req.file ? unlinkSync(req.file.path) : null; // Delete unnecessary profile picture already stored.
            return res.status(401).send({
                success: false,
                message: 'User already exists with this email.',
            });
        } else {
            const filePath = `/upload/${req.file.filename}`;
            userData.profilePic = filePath;
            userData.userPassword = await bcrypt.hash(req.body.userPassword, salt); // Hash the password.
            const user = await userData.save(); // Save user data in the database.
            res.status(201).json({
                success: true,
                message: 'User has been created successfully.',
                user: user,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

// Function to log in a user.
const userLogin = async (req, res) => {
    try {
        const userData = await userSchema.findOne({ userEmail: req.body.userEmail });
        if (userData) {
            const isPasswordValid = await bcrypt.compare(req.body.userPassword, userData.userPassword);
            if (isPasswordValid) {
                const token = jwt.sign({ userData }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });
                res.status(200).send({
                    success: true,
                    message: 'Login successful.',
                    token: token,
                });
            } else {
                res.status(401).send({
                    success: false,
                    message: 'Email or password is incorrect.',
                });
            }
        } else {
            res.status(403).send({
                success: false,
                message: 'Email does not exist.',
            });
        }
    } catch (err) {
        res.send({
            success: false,
            message: err.message,
        });
    }
};

// Function to send an email.
const sendUserDataPasswordEmail = async (req, res) => {
    const { userEmail } = req.body;
    try {
        const userData = await userSchema.findOne({ userEmail: req.body.userEmail });
        if (userData != null) {
            const secret = userData._id + process.env.SECRET_KEY;
            const token = jwt.sign({ userID: userData._id }, secret, { expiresIn: "20m" });
            const link = `http://127.0.0.1:3000/user/reset-password/${userData._id}/${token}`;
            let info = await transporter.sendMail({
                from: "nameste380@gmail.com",
                to: userEmail,
                subject: "Email for user password reset",
                html: `<a href=${link}>Click on this link to reset your password</a>`
            });
            return res.status(201).json({
                success: true,
                message: "Email sent successfully.",
                token: token,
                userID: userData._id,
            });
        } else {
            res.status(403).json({
                success: false,
                message: "Please enter a valid email.",
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occurred: ${error.message}`,
        });
    }
};

// Function for resetting the password.
const userResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;
    try {
        const checkUser = await userSchema.findById(id);
        if (checkUser != null) {
            const secretKey = checkUser._id + process.env.SECRET_KEY;
            if (newPassword === confirmPassword) {
                const salt = await bcrypt.genSalt(10);
                const bcryptPassword = await bcrypt.hash(confirmPassword, salt);
                await userSchema.findByIdAndUpdate(checkUser._id, {
                    $set: { userPassword: bcryptPassword },
                });
                res.status(201).json({
                    success: true,
                    message: "Password updated successfully.",
                });
            } else {
                res.status(403).json({
                    success: false,
                    message: "Password and Confirm Password do not match.",
                });
            }
        } else {
            res.status(403).json({
                success: false,
                message: `Please enter a valid email.`,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Error occurred: ${error.message}`,
        });
    }
};

// Export all functions in this module.
module.exports = {
    createUser,
    userLogin,
    sendUserDataPasswordEmail,
    userResetPassword,
};
