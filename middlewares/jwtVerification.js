const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const authHeader = req.headers.authorization; 

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SERCET_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Token is not valid" });
            }

            req.user = decoded.user;
            next();
        });
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

module.exports = verify;
