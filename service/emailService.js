const nodemailer = require('nodemailer');

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