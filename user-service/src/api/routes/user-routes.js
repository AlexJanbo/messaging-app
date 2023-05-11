const express = require('express')
const { RegisterUser, LoginUser, GetUserInformation } = require('../controllers/user-controller')
const { Authenticate } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts')

const router = express.Router()


router.route('/register').post(RegisterUser)
router.route('/login').post(LimitLoginAttempts, LoginUser)
// router.route('/profile/:id').post(Authenticate, GetUserInformation)


module.exports = router