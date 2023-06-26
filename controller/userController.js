let userSchema = require('../models/userSchema')
let createUser = async(req,res)=>{
    console.log(req.body)
    try{
        const userExits = await userSchema.findOne({
            userEmail:  req.body.userEmail
        })
        if(userExits){
            return res.status(401).send({
                success: false,
                message: 'User allready exists'
            });
        }
        else{
            console.log(req.body)
            const userData = await user.save()
            res.status(200).send({
                success: true,
                message: 'User created'
            });
        }
    }
    catch(err){
        res.send({
            success: false,
            message: err.message
        })
    }
}

module.exports = {
    createUser
}