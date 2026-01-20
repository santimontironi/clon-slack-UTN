import workspaceController from "../controllers/workspace.controller.js";
import { Router } from "express";

const router = Router()

router.get('/my-workspaces', workspaceController.getMyWorkspaces)
router.post('/create-workspace', workspaceController.createWorkspace)
router.delete('/leave-workspace/:idWorkspace', workspaceController.leaveWorkspace)

export default router