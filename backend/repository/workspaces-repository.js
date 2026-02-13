import Workspace from "../models/Workspace.model.js";
import MemberWorkspaceModel from "../models/MemberWorkspaceModel.model.js";
import Channel from "../models/Channel.model.js";
import ChannelMessage from "../models/ChannelMessage.model.js";

class WorkspaceRepository {
    async getMyWorkspaces(idUser) {
        const workspaces = await MemberWorkspaceModel.find({ fk_id_user: idUser }).populate({ path: 'fk_id_workspace', match: { active: true } })

        const workspacesFilter = workspaces.filter(workspace => workspace.fk_id_workspace !== null)

        return workspacesFilter
    }

    async createWorkspace(fk_id_owner, title, description, image) {
        const workspace = await Workspace.create({ fk_id_owner, title, image, description })
        await MemberWorkspaceModel.create({ fk_id_workspace: workspace._id, fk_id_user: fk_id_owner, role: 'owner' })
        return workspace
    }

    async findWorkspaceByIdAndUser(idWorkspace, idUser) {
        const workspace = await MemberWorkspaceModel.findOne({ fk_id_workspace: idWorkspace, fk_id_user: idUser }).populate({ path: 'fk_id_workspace', match: { active: true } })
        return workspace
    }

    async leaveWorkspace(fk_id_workspace, fk_id_user) {
        const memberLeave = await MemberWorkspaceModel.findOneAndDelete({ fk_id_workspace, fk_id_user })
        return memberLeave
    }

    async deleteWorkspace(idWorkspace) {
        const workspace = await Workspace.findByIdAndUpdate(idWorkspace, { active: false })
        return workspace
    }

    async getWorkspaceById(idWorkspace) {
        const workspace = await Workspace.findById(idWorkspace).populate({ path: 'fk_id_owner', match: { active: true } })
        return workspace
    }

    async deleteMember(idMember) {
        const member = await MemberWorkspaceModel.findByIdAndDelete(idMember)
        return member
    }

    async workspacesChannels(idWorkspace) {
        const channels = await Channel.find({ fk_id_workspace: idWorkspace }).populate({ path: 'fk_id_workspace', match: { active: true } })
        return channels
    }

    async createChannel(fk_id_workspace, name, description) {
        const channel = await Channel.create({ fk_id_workspace, name, description })
        return channel
    }

    async createMessage(fk_id_channel, fk_id_member, message) {
        const newMessage = await ChannelMessage.create({
            fk_id_channel,
            fk_id_member,
            message
        })

        return newMessage
    }

    async getWorkspaceMembers(idWorkspace) {
        const members = await MemberWorkspaceModel.find({ fk_id_workspace: idWorkspace }).populate({ path: 'fk_id_user', match: { active: true } })
        return members
    }
}

const workspaceRepository = new WorkspaceRepository()
export default workspaceRepository