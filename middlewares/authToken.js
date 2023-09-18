const jwt = require('jsonwebtoken'); // Import JWT for creating JWT tokens.

const userAuthentication = async (req, res, next) => {
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        let token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                // If the token is incorrect or expired.
                res.status(401).json({
                    success: false,
                    message: "User authentication failed"
                });
            } else {
                // If the token is valid.
                req.user = decoded.userData;
                console.log(decoded.userData);
                next(); // Allow the request to proceed to the next function.
            }
        });
    } else {
        // If no token is found in the headers.
        res.status(401).json({
            success: false,
            message: "Token not found"
        });
    }
};

module.exports = {
    userAuthentication
};
