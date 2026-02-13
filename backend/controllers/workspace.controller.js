import workspaceRepository from "../repository/workspaces-repository.js"
import userRepository from "../repository/user-repository.js"
import jwt from "jsonwebtoken"
import mail_transporter from "../config/mail.config.js"
import cloudinary from "../config/cloudinary.js"

class WorkspaceController {

    async createWorkspace(req, res) {
        try {
            const { title, description } = req.body
            const user = req.user
            let imageUrl = null

            if (!title) {
                return res.status(400).json({ message: 'Falta el campo requerido: title' })
            }

            // si hay un archivo, subirlo a Cloudinary
            if (req.file) {
                const b64 = Buffer.from(req.file.buffer).toString('base64')
                const dataURI = `data:${req.file.mimetype};base64,${b64}`
                
                const result = await cloudinary.uploader.upload(dataURI, {
                    folder: 'workspaces',
                    resource_type: 'auto'
                })
                
                imageUrl = result.secure_url
            }

            const workspace = await workspaceRepository.createWorkspace(
                user.id,
                title,
                description,
                imageUrl
            )

            return res.status(200).json({ message: 'Workspace creado con exito', workspace })
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el workspace', error: error.message })
        }
    }

    async getMyWorkspaces(req, res) {
        try {
            const user = req.user
            const workspaces = await workspaceRepository.getMyWorkspaces(user.id)

            const workspacesFormat = workspaces.map((member) => ({
                _id: member.fk_id_workspace._id,
                title: member.fk_id_workspace.title,
                description: member.fk_id_workspace.description,
                image: member.fk_id_workspace.image,
                created_at: member.fk_id_workspace.created_at
            }))

            if (workspaces.length === 0) {
                return res.status(404).json({ message: 'No se encontraron workspaces.' })
            }

            return res.status(200).json({ message: 'Workspaces obtenidos con exito', workspaces: workspacesFormat })
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los workspaces', error: error.message })
        }
    }

    async leaveWorkspace(req, res) {
        try {
            const { idWorkspace } = req.params
            const user = req.user

            const workspace = await workspaceRepository.leaveWorkspace(idWorkspace, user.id)

            return res.status(200).json({ message: 'Workspace abandonado con exito', workspace })
        } catch (error) {
            return res.status(500).json({ message: 'Error al abandonar el workspace', error: error.message })
        }
    }

    async deleteWorkspace(req, res) {
        try {
            const { idWorkspace } = req.params
            const member = req.member

            if (member.role !== 'owner') {
                return res.status(403).json({ message: 'No tienes permiso para eliminar el workspace.' })
            }

            const workspace = await workspaceRepository.deleteWorkspace(idWorkspace)

            return res.status(200).json({ message: 'Workspace eliminado con exito', workspace })
        } catch (error) {
            return res.status(500).json({ message: 'Error al eliminar el workspace', error: error.message })
        }
    }

    async sendInvitation(req, res) {
        try {
            const { email, role } = req.body
            const { idWorkspace } = req.params
            const member = req.member

            if (!email || !role) {
                return res.status(400).json({ message: 'Faltan campos requeridos: email, role' })
            }

            if (!['owner', 'admin'].includes(member.role)) {
                return res.status(403).json({ message: 'No tienes permiso para enviar invitaciones.' })
            }

            const userFounded = await userRepository.findByEmail(email)

            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado.' })
            }

            const isMember = await workspaceRepository.findWorkspaceByIdAndUser(
                idWorkspace,
                userFounded.id
            )

            if (isMember) {
                return res.status(400).json({ message: 'El usuario ya es miembro del workspace.' })
            }

            const token = jwt.sign({ idWorkspace, email, role }, process.env.SECRET_KEY)

            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Invitacion a workspace - UTN SLACK',
                html: `<a href="${process.env.BACKEND_URL}/api/workspace/invite/${token}">Unirse</a>`
            })

            return res.status(200).json({ message: 'Invitación enviada con éxito' })
        } catch (error) {
            return res.status(500).json({ message: 'Error al enviar la invitación', error: error.message })
        }
    }

    async addMember(req, res) {
        try {
            const { email, role } = req.body
            const { idWorkspace } = req.params
            const member = req.member

            if (!email || !role) {
                return res.status(400).json({ message: 'Faltan campos requeridos: email, role' })
            }

            if (!['owner', 'admin'].includes(member.role)) {
                return res.status(403).json({ message: 'No tienes permiso para agregar miembros.' })
            }

            const newMember = await workspaceRepository.addMember(idWorkspace, email, role)

            return res.status(200).json({ message: 'Miembro agregado con exito', member: newMember })
        } catch (error) {
            return res.status(500).json({ message: 'Error al agregar el miembro', error: error.message })
        }
    }

    async checkInvitation(req, res) {
        try {
            const { token } = req.params

            if (!token) {
                return res.status(400).json({ message: 'Token de invitacion no proporcionado.' })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const { idWorkspace, email, role } = decoded

            const newMember = await workspaceRepository.addMember(idWorkspace, email, role)

            return res.status(200).json({ message: 'Invitacion verificada con exito', member: newMember })
        } catch (error) {
            return res.status(500).json({ message: 'Error al verificar la invitacion', error: error.message })
        }
    }

    async workspaceById(req, res) {
        try {
            const { idWorkspace } = req.params

            const member = req.member

            if(!member) {
                return res.status(403).json({ message: 'No tienes permiso para obtener el workspace.' })
            }

            const workspace = await workspaceRepository.getWorkspaceById(idWorkspace)

            return res.status(200).json({ message: 'Workspace encontrado con exito', workspace })
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener el workspace', error: error.message })
        }
    }

    async getWorkspacesChannels(req, res) {
        try {
            const { idWorkspace } = req.params

            const channels = await workspaceRepository.workspacesChannels(idWorkspace)

            return res.status(200).json({ message: 'Canales obtenidos con éxito', channels })
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los canales', error: error.message })
        }
    }

    async createChannel(req, res) {
        try {
            const { idWorkspace } = req.params
            const member = req.member

            const {name, description} = req.body

            if (!name) {
                return res.status(400).json({ message: 'Falta el campo requerido: name' })
            }

            if (!['owner', 'admin'].includes(member.role)) {
                return res.status(403).json({ message: 'No tienes permiso para crear canales.' })
            }

            const channel = await workspaceRepository.createChannel(idWorkspace, name, description)

            return res.status(200).json({ message: 'Canal creado con éxito', channel })
        } catch (error) {
            return res.status(500).json({ message: 'Error al crear el canal', error: error.message })
        }
    }

    async createMessage(req, res) {
        try {
            const { idChannel } = req.params
            const { message } = req.body
            const member = req.member

            if (!message) {
                return res.status(400).json({ message: 'Falta el campo requerido: message' })
            }

            const newMessage = await workspaceRepository.createMessage(
                idChannel,
                member._id,
                message
            )

            return res.status(201).json({
                message: 'Mensaje creado con éxito',
                data: newMessage
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error al crear el mensaje',
                error: error.message
            })
        }
    }
}

const workspaceController = new WorkspaceController()
export default workspaceController