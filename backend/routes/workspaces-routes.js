import workspaceController from "../controllers/workspace.controller.js"
import { verifyToken } from "../middlewares/verify-token.js"
import { memberMiddleware } from "../middlewares/member-middleware.js"
import { Router } from "express"

const router = Router()

router.get('/my-workspaces', verifyToken, workspaceController.getMyWorkspaces)
router.post('/create-workspace', verifyToken, workspaceController.createWorkspace)

router.get('/:idWorkspace', verifyToken, memberMiddleware, workspaceController.workspaceById)
router.delete('/:idWorkspace/eliminar', verifyToken, memberMiddleware, workspaceController.deleteWorkspace)

router.post('/:idWorkspace/enviar-invitacion', verifyToken, memberMiddleware, workspaceController.sendInvitation)
router.post('/:idWorkspace/agregar-miembro', verifyToken, memberMiddleware, workspaceController.addMember)
router.delete('/:idWorkspace/abandonar', verifyToken, workspaceController.leaveWorkspace)

router.get('/check-invitation/:token', workspaceController.checkInvitation)

router.get('/:idWorkspace/canales', verifyToken, memberMiddleware, workspaceController.getWorkspacesChannels)
router.post('/:idWorkspace/canales', verifyToken, memberMiddleware, workspaceController.createChannel)

router.post('/:idWorkspace/canales/:idChannel/mensaje', verifyToken, memberMiddleware, workspaceController.createMessage)

export default router