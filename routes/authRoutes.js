import express from 'express'
const router = express.Router()

import rateLimiter from 'express-rate-limit'

const apilimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message: 'Too many request, Please, try again in 15min',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

import { register, login, updateUser } from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'

router.route('/register').post(apilimiter, register)
router.route('/login').post(apilimiter, login)
router.route('/updateUser').patch(authenticateUser, updateUser)

export default router
