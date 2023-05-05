const express = require('express')
const { RegisterUser, LoginUser } = require('../controllers/user-controller')

const router = express.Router()

const { Authenticate } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts.js')

router.route('/register').post(RegisterUser)
router.route('/login').post(LimitLoginAttempts, LoginUser)
router.route('/profile').post(Authenticate, GetUser)


module.exports = router