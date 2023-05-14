const { ValidateJWT } = require('../../utils')

const Authentication = async (req, res, next) => {

    const isAuthorized = await ValidateJWT(req)

    if(isAuthorized) {
        return next()
    }
}

module.exports = {
    Authentication
}


