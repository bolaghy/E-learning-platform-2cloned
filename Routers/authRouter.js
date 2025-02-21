const router = require('express').Router()
const {register, login, confirmEmail} = require('../Controllers/authController')
const {requestPasswordReset, resetPassword} = require('../Controllers/resetPasswordCon')
const {roleMiddleware, authMiddleware} = require('../Middleware/authMiddleware')


router.route(`/register`).post(register)
router.route(`/login`).post(login)
router.route(`/confirm-mail`).post(authMiddleware, confirmEmail)
router.route(`/reset-password-link`).post(authMiddleware, requestPasswordReset)
router.route(`/reset-password`).post(authMiddleware, resetPassword)

module.exports = router      