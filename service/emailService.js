const nodemailer = require('nodemailer');

// Nodemailer Transpoter is Require Email and Verification Pass
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "nameste380@gmail.com",
        pass: "gayfkwafzcudvuri",
    }
});

module.exports = {
    transporter
}