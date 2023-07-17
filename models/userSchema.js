const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        required: true,
    },
    userPhone: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        required: true,
    },
    userState: {
        type: String,
        required: true,
    },
    userCity: {
        type: String,
        required: true,
    },
    userRole:{
        type: String,
        default: "user",
    },
    profilePic: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})
userSchema.set('timestamps',true)
module.exports = mongoose.model('user', userSchema);
