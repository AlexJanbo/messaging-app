const { ValidateSignature } = require('../../utils')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../../config/index')
const axios = require('axios')

const Authentication = async (req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, APP_SECRET)

            const config = {
                Authorization: req.headers.authorization
            }
            const userData = {
                userId: decoded.id
            }

            req.user = await axios.put('http://localhost:8000/api/users/get-user-by-id', userData, config)

            next()
        } catch (error) {
            console.log(error)
            res.status(401).json({ message: "Not authorized"})
        }
    }

    if(!token) {
        res.status(401).json({ message: "Not authorized, no token"})
    }
}

module.exports = {
    Authentication
}