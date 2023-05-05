const { ValidateSignature } = require('../../utils')

module.exports = async (req, res, next) => {

    const isAuthorized = await ValidateJWT(req)

    if(isAuthorized) {
        return next()
    }

    res.status(403).json({ message: "Not Authorized"})
}
