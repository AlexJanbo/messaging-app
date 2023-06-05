const express = require('express')
const { RegisterUser, LoginUser, GetUserInformation, ChangeProfilePicture, GetAllUsers, GetUserById, QueryUsers } = require('../controllers/user-controller')
const { Authentication } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts')

const router = express.Router()


router.route('/register').post(RegisterUser)
router.route('/login').post(LimitLoginAttempts, LoginUser)
router.route('/profile').post(GetUserInformation)
router.route('/change-profile-picture').put(ChangeProfilePicture)
router.route('/get-all-users').get(GetAllUsers)
router.route('/get-user/:id').put(GetUserById)
router.route('/search').get(Authentication, QueryUsers)


module.exports = router