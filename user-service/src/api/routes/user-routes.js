const express = require('express')
const { RegisterUser, LoginUser, GetUserInformation, ChangeProfilePicture, GetAllUsers, GetUserById } = require('../controllers/user-controller')
const { Authenticate } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts')

const router = express.Router()


router.route('/register').post(RegisterUser)
router.route('/login').post(LimitLoginAttempts, LoginUser)
router.route('/profile').post(GetUserInformation)
router.route('/change-profile-picture').put(ChangeProfilePicture)
router.route('/get-all-users').get(GetAllUsers)
router.route('/get-user/:id').put(GetUserById)


module.exports = router