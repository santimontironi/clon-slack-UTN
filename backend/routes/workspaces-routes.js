import workspaceController from "../controllers/workspace.controller.js";
import { verifyToken } from "../middlewares/verify-token.js";
import { Router } from "express";

const router = Router()

router.get('/my-workspaces', verifyToken, workspaceController.getMyWorkspaces)
router.post('/create-workspace', verifyToken, workspaceController.createWorkspace)
router.delete('/leave-workspace/:idWorkspace', verifyToken, workspaceController.leaveWorkspace)
router.delete('/delete-workspace/:idWorkspace', verifyToken, workspaceController.deleteWorkspace)

export default router