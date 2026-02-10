import authController from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verify-token.js'
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
    '/verify-email/:token',
    authController.verifyEmail
)

authRouter.get(
    '/dashboard-user',
    verifyToken,
    authController.dashboardUser
)

authRouter.post(
    '/logout',
    authController.logout
)

export default authRouter