import workspaceController from "../controllers/workspace.controller.js"
import { verifyToken } from "../middlewares/verify-token.js"
import { memberMiddleware } from "../middlewares/member-middleware.js"
import { upload } from "../middlewares/multer.js"
import { Router } from "express"

const router = Router()

router.get('/my-workspaces', verifyToken, workspaceController.getMyWorkspaces)
router.get('/:idWorkspace', verifyToken, memberMiddleware, workspaceController.workspaceById)
router.get('/check-invitation/:token', workspaceController.checkInvitation)
router.get('/:idWorkspace/canales', verifyToken, memberMiddleware, workspaceController.getWorkspacesChannels)

router.post('/create-workspace', verifyToken, upload.single('image'), workspaceController.createWorkspace)
router.post('/:idWorkspace/enviar-invitacion', verifyToken, memberMiddleware, workspaceController.sendInvitation)
router.post('/:idWorkspace/agregar-miembro', verifyToken, memberMiddleware, workspaceController.addMember)
router.post('/:idWorkspace/canales', verifyToken, memberMiddleware, workspaceController.createChannel)
router.post('/:idWorkspace/canales/:idChannel/mensaje', verifyToken, memberMiddleware, workspaceController.createMessage)


router.delete('/:idWorkspace/eliminar', verifyToken, memberMiddleware, workspaceController.deleteWorkspace)
router.delete('/:idWorkspace/abandonar', verifyToken, workspaceController.leaveWorkspace)


export default router