import authController from '../controllers/auth.controller.js'
import { verifyToken } from '../middlewares/verify-token.js'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login',authController.login)
authRouter.post('/logout',authController.logout)
authRouter.post('/send-reset-password-email', authController.sendChangePasswordEmail)

authRouter.get('/verify-email/:token',authController.verifyEmail)
authRouter.get('/dashboard-user',verifyToken,authController.dashboardUser)


export default authRouter