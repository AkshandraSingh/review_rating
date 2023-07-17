const jwt = require('jsonwebtoken')

const userAuthetication = async (req,res,next) =>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')){
        let token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "User authentication failed"
                });
            } else{
                req.user = decoded.userData;
                console.log(decoded.userData);
                next();
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Token Not Found"
        })
    }
}

const userAuthorization = async (req,res,next)=>{
    if (req.role == 'user') {
        next()
    } else {
        res.status(401)
    }
}

module.exports = {
    userAuthetication,
    userAuthorization
}