const jwt = require('jsonwebtoken') // ? For Creating JWT Token .

const userAuthetication = async (req,res,next) =>{
    const authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')){
        let token = authHeader.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
            if (err) { // ? if token is Incorect .
                res.status(401).json({
                    success: false,
                    message: "User authentication failed"
                });
            } else{
                req.user = decoded.userData;
                console.log(decoded.userData);
                next(); // ! it allows to go in next Function .
            }
        })
    } else {
        res.status(401).json({
            success: false,
            message: "Token Not Found"
        })
    }
}


module.exports = {
    userAuthetication
}