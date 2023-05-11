const jwt = require('jsonwebtoken')

const ValidateJWT = async(req) => {
    try {
        const signature = req.get("Authorization")
        const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET)
        if(req.user = payload) {
            return true
        }
    } catch (error) {
        
    }
}