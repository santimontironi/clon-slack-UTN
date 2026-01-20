import Workspace from "../models/Workspace.model.js";
import MemberWorkspaceModel from "../models/MemberWorkspaceModel.model.js";

class WorkspaceRepository {
    async getMyWorkspaces(idUser) {
        const workspaces = await MemberWorkspaceModel.find({ fk_id_user: idUser }).populate('fk_id_workspace')
        
        return workspaces
    }

    async createWorkspace(fk_id_owner, title, description, image) {
        const workspace = await Workspace.create({ fk_id_owner, title, image, description })
        await MemberWorkspaceModel.create({ fk_id_workspace: workspace._id, fk_id_user: fk_id_owner, role: 'owner' })
        return workspace
    }

    async addMember(fk_id_workspace, fk_id_user, role) {
        const member = await MemberWorkspaceModel.create({ fk_id_workspace, fk_id_user, role })
        return member
    }

    async leaveWorkspace(fk_id_workspace, fk_id_user) {
        const memberLeave = await MemberWorkspaceModel.findOneAndDelete({ fk_id_workspace, fk_id_user })
        return memberLeave
    }
}

const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository