const jwt = require('jwt-then');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log(token)
        const decodedToken = jwt.verify(token, process.env.SECRET).then(decodedToken => {
            const userId = decodedToken.userId;
            console.log("DecodedUserId:",userId)

            if (req.body.userId && req.body.userId !== userId) {
                res.status(403).json({message: 'Access Denied',body:{}});
            } else {
                console.log("LoggedIn Successful, DecodedToken:",decodedToken)
                next();
            }
        }).catch(err => {
            res.status(403).json({message: err.message,body:{}});
        })
    } catch {
        res.status(401).json({message:'Invalid request!',body:{}});

    }
};

