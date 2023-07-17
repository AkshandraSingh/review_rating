const { transporter, mailOptions } = require('../service/emailService')

let emailSender = async function getEmail(req, res){
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Email sender Pass" + info.response);
        }
    })
}

module.exports = emailSender
