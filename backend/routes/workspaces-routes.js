import workspaceController from "../controllers/workspace.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { Router } from "express";

const router = Router()

router.get('/my-workspaces', verifyToken, workspaceController.getMyWorkspaces)
router.get('/check-invitation', verifyToken, workspaceController.checkInvitation)
router.get('/:idWorkspace', verifyToken, workspaceController.workspaceById)
router.get('/:idWorkspace/caanales', verifyToken, workspaceController.getWorkspacesChannels)

router.post('/create-workspace', verifyToken, workspaceController.createWorkspace)
router.post('/:idWorkspace/enviar-invitacion', verifyToken, workspaceController.sendInvitation)
router.post('/:idWorkspace/agregar-miembro', verifyToken, workspaceController.addMember)
router.post('/:idWorkspace/canal', verifyToken, workspaceController.createChannel)
router.post('/:idWorkspace/canales/:idChannel/mensaje', verifyToken, workspaceController.createMessage)

router.delete('/:idWorkspace/abandonar', verifyToken, workspaceController.leaveWorkspace)
router.delete('/:idWorkspace/eliminar', verifyToken, workspaceController.deleteWorkspace)

export default router