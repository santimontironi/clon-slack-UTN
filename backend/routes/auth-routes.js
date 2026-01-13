import authController from '../controllers/auth.controller.js'
import { Router } from 'express'

const authRouter = Router()

authRouter.post(
    '/register', 
    authController.register
)

authRouter.post(
    '/login',
    authController.login
)

authRouter.get(
    '/verify-email',
    authController.verifyEmail
)

export default authRouter