const express = require('express')
const { RegisterUser, LoginUser, GetUserInformation, ChangeProfilePicture, GetAllUsers, GetUserById, QueryUsers, GetUsersFromUsernameArray, CreateNotification } = require('../controllers/user-controller')
const { Authentication } = require('../middleware/authentication')
const { LimitLoginAttempts } = require('../middleware/limit-login-attempts')

const router = express.Router()


// API end points called from client
router.route('/register').post(RegisterUser)
router.route('/login').post(LimitLoginAttempts, LoginUser)
router.route('/change-profile-picture').put(Authentication, ChangeProfilePicture)
router.route('/get-all-users').get(Authentication, GetAllUsers)
router.route('/search').get(Authentication, QueryUsers)


// API end points called from other services
// Authentication handled separately
router.route('/get-users-from-username-array').post(GetUsersFromUsernameArray)
router.route('/create-notification').post(CreateNotification)
router.route('/get-user-by-id').put(GetUserById)
router.route('/profile').post(GetUserInformation)

module.exports = router