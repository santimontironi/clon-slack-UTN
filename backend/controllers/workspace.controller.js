import workspaceRepository from "../repository/workspaces-repository.js"
import userRepository from "../repository/user-repository.js"
import jwt from "jsonwebtoken"
import mail_transporter from "../config/mail.config.js"

class WorkspaceController {

    async createWorkspace(req, res) {
        try {
            const { title, description, image } = req.body

            const user = req.user

            const workspace = await workspaceRepository.createWorkspace(user.id, title, image, description)

            return res.status(200).json({ message: 'Workspace creado con exito', workspace: workspace })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al crear el workspace', error: error.message })
        }
    }

    async getMyWorkspaces(req, res) {
        try {
            const user = req.user

            const workspaces = await workspaceRepository.getMyWorkspaces(user.id)

            if (workspaces.length === 0) {
                return res.status(404).json({ message: 'No se encontraron workspaces.' })
            }

            return res.status(200).json({ message: 'Workspaces obtenidos con exito', workspaces: workspaces })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al obtener los workspaces', error: error.message })
        }
    }

    async leaveWorkspace(req, res) {
        try {
            const { idWorkspace } = req.params

            const user = req.user

            const workspace = await workspaceRepository.leaveWorkspace(idWorkspace, user.id)

            return res.status(200).json({ message: 'Workspace abandonado con exito', workspace: workspace })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al abandonar el workspace', error: error.message })
        }
    }

    async deleteWorkspace(req, res) {
        try {
            const { idWorkspace } = req.params

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if (member.role !== 'owner') {
                return res.status(403).json({ message: 'No tienes permiso para eliminar el workspace.' })
            }

            const workspace = await workspaceRepository.deleteWorkspace(idWorkspace)

            return res.status(200).json({ message: 'Workspace eliminado con exito', workspace: workspace })
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el workspace', error: error.message })
        }
    }

    async sendInvitation(req, res) {
        try {
            const { email, role } = req.body

            const { idWorkspace } = req.params

            const userFounded = await userRepository.findByEmail(email)

            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado.' })
            }

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if (member.role !== 'owner' && member.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permiso para enviar invitaciones.' })
            }

            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado.' })
            }

            const isMember = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, userFounded.id)

            if (isMember) {
                return res.status(400).json({ message: 'El usuario ya es miembro del workspace.' })
            }

            const token = jwt.sign({ idWorkspace, email, role }, process.env.SECRET_KEY)

            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Invitacion a workspace - UTN SLACK',
                html: `<h1>Invitacion a workspace - UTN SLACK</h1>
                       <p>Por favor, haz click en el siguiente enlace para unirse al workspace:</p>
                       <a href="http://localhost:3000/api/workspace/invite/${token}">Unirse al workspace</a>`
            })

            return res.status(200).json({ message: 'Invitacion enviada con exito' })
        }
        catch (error) {
            return res.json({ message: 'Error al enviar la invitacion', error: error.message })
        }
    }

    async addMember(req,res){
        try{
            const { email, role } = req.body

            const { idWorkspace } = req.params

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if (member.role !== 'owner' && member.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permiso para agregar miembros.' })
            }

            const newMember = await workspaceRepository.addMember(idWorkspace, email, role)

            return res.status(200).json({ message: 'Miembro agregado con exito', member: newMember })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al agregar el miembro', error: error.message })
        }
    }

    async checkInvitation(req,res){
        try{
            const { token } = req.params

            if (!token) {
                return res.status(400).json({ message: 'Token de invitacion no proporcionado.' })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            const { idWorkspace, email, role } = decoded

            const newMember = await workspaceRepository.addMember(idWorkspace, email, role)

            return res.status(200).json({ message: 'Invitacion verificada con exito', member: newMember })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al verificar la invitacion', error: error.message })
        }
    }

    async workspaceById(req,res){
        try{
            const { idWorkspace } = req.params

            const member = workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if (!member) {
                return res.status(404).json({ message: 'Workspace no encontrado.' })
            }

            const workspace = await workspaceRepository.getWorkspaceById(idWorkspace)

            return res.status(200).json({ message: 'Workspace encontrado con exito', workspace: workspace })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al obtener el workspace', error: error.message })
        }
    }

    async deleteMember(req,res){
        try{
            const { idMember } = req.params

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idMember, req.user.id)

            if (member.role !== 'owner' && member.role !== 'admin') {
                return res.status(403).json({ message: 'No tienes permiso para eliminar miembros.' })
            }

            const memberToDelete = await workspaceRepository.deleteMember(idMember)

            return res.status(200).json({ message: 'Miembro eliminado con exito', member: memberToDelete })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al eliminar el miembro', error: error.message })
        }
    }

    async getWorkspacesChannels(req,res){
        try{
            const { idWorkspace } = req.params

            const member = await workspaceRepository.findWorkspaceByIdAndUser(idWorkspace, req.user.id)

            if (!member) {
                return res.status(404).json({ message: 'Workspace no encontrado.' })
            }

            const channels = await workspaceRepository.workspacesChannels(idWorkspace)

            return res.status(200).json({ message: 'Canales obtenidos con exito', channels: channels })
        }
        catch(error){
            return res.status(500).json({ message: 'Error al obtener los canales', error: error.message })
        }
    }
}

const workspaceController = new WorkspaceController()
export default workspaceController