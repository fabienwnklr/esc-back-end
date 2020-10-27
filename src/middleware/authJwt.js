const jwt = require("jsonwebtoken");
/**
 * @param {Request} req 
 * @param {Response} res
 * @param {CallableFunction} next
 */
module.exports.verifyToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers['Authorization']
        if (typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ')
            const bearerToken = bearer[1]
            req.token = bearerToken
            jwt.verify(req.token, 'secretkey', (err, user) => {
                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        res.status(401).send({
                            message: 'Connexion expirée'
                        })
                    } else {
                        res.status(401).send({
                            message: 'Token invalide'
                        })
                    }
                }
                req.user = user
                next()
            })
        } else {
            res.send({
                message: `No token provided ${req.headers}`
            })
        }
    } catch (err) {
        console.error(`An error occurred ${err}`)
    }
};