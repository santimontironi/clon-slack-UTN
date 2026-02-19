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
                return res.status(403).json({ message: 'No tienes permiso para agregar miembros.' })
            }

            // Verificar si el usuario existe
            const userFounded = await userRepository.findByEmail(email)

            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado. El usuario debe estar registrado en la plataforma.' })
            }

            // Verificar si el usuario ha verificado su email
            if (!userFounded.verify_email) {
                return res.status(403).json({ message: 'El usuario debe verificar su email antes de ser agregado al workspace.' })
            }

            // Verificar si ya es miembro
            const isMember = await workspaceRepository.findWorkspaceByIdAndUser(
                idWorkspace,
                userFounded.id
            )

            if (isMember) {
                return res.status(400).json({ message: 'El usuario ya es miembro del workspace.' })
            }

            const token = jwt.sign(
                { idWorkspace, email, role: role.toLowerCase() },
                process.env.SECRET_KEY,
                { expiresIn: '1d' }
            )

            const invitationUrl = `${process.env.FRONTEND_URL}/aceptar-invitacion/${token}`

            await mail_transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Invitación a workspace - UTN SLACK',
                html: `
                    <div style="margin:0; padding:0; background-color:#6C3BD1; font-family: Arial, Helvetica, sans-serif;">
                        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#6C3BD1; padding:40px 0;">
                            <tr>
                                <td align="center">
                                    <table width="600" cellpadding="0" cellspacing="0"
                                        style="background-color:#7E4BE8; border-radius:12px; padding:40px; text-align:center;">
                                        
                                        <tr>
                                            <td>
                                                <h1 style="color:#FFFFFF; margin-bottom:20px;">
                                                    Invitación a Workspace 🚀
                                                </h1>

                                                <p style="color:#FFFFFF; font-size:16px; margin-bottom:30px;">
                                                    Fuiste invitado a unirte a un workspace en <strong>UTN SLACK</strong>.<br/>
                                                    Tu rol asignado será: <strong style="text-transform: capitalize;">${role}</strong>.
                                                </p>

                                                <a href="${invitationUrl}"
                                                style="display:inline-block;
                                                        padding:15px 30px;
                                                        background-color:#FFFFFF;
                                                        color:#6C3BD1;
                                                        text-decoration:none;
                                                        font-weight:bold;
                                                        border-radius:8px;
                                                        font-size:16px;">
                                                    Aceptar invitación
                                                </a>

                                                <p style="color:#E0D7FF; font-size:14px; margin-top:30px;">
                                                    Este enlace expirará en 24 horas.<br/>
                                                    Si no esperabas esta invitación, podés ignorar este mensaje.
                                                </p>

                                            </td>
                                        </tr>

                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                    `
            })

            return res.status(200).json({
                message: 'Invitacion enviada con éxito'
            })
        } catch (error) {
            return res.status(500).json({ message: 'Error al enviar la invitacion', error: error.message })
        }
    }

    async checkInvitation(req, res) {
        try {
            const token = req.params.token

            if (!token) {
                return res.status(400).json({ message: 'Token de invitacion no proporcionado.' })
            }

            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const { idWorkspace, email, role } = decoded

            const roleNormalized = String(role).toLowerCase()

            if (!['user', 'admin'].includes(roleNormalized)) {
                return res.status(400).json({ message: 'Rol inválido en la invitacion.' })
            }

            // Si hay usuario autenticado, verificar que el email coincida
            if (req.user && req.user.email !== email) {
                return res.status(403).json({ message: 'El email no coincide con la invitacion.' })
            }

            const userFounded = await userRepository.findByEmail(email)

            // Si el usuario no existe, redirigir al registro
            if (!userFounded) {
                return res.status(404).json({ message: 'Usuario no encontrado. Debes registrarte primero.' })
            }

            // Si el usuario existe pero no ha verificado su email, no puede unirse al workspace
            if (!userFounded.verify_email) {
                return res.status(403).json({ message: 'Debes verificar tu email antes de unirte al workspace.' })
            }

            const isMember = await workspaceRepository.findWorkspaceByIdAndUser(
                idWorkspace,
                userFounded.id
            )

            if (isMember) {
                return res.status(400).json({ message: 'El usuario ya es miembro del workspace.' })
            }

            const newMember = await workspaceRepository.addMember(idWorkspace, userFounded.id, roleNormalized)

            return res.status(200).json({
                message: 'Invitacion verificada con exito',
                member: newMember,
                workspaceId: idWorkspace
            })
        } catch (error) {
            return res.status(500).json({ message: 'Error al verificar la invitacion', error: error.message })
        }
    }

    async workspaceById(req, res) {
        try {
            const { idWorkspace } = req.params

            const member = req.member

            if (!member) {
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

            if (!idWorkspace) {
                return res.status(400).json({ message: 'Falta el campo requerido: idWorkspace' })
            }

            const { name, description } = req.body

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

    async membersWorkspace(req, res) {
        try {
            const { idWorkspace } = req.params

            if (!idWorkspace) {
                return res.status(400).json({ message: 'Falta el campo requerido: idWorkspace' })
            }

            const members = await workspaceRepository.getWorkspaceMembers(idWorkspace)

            const membersFormat = members.map((member) => ({
                _id: member.fk_id_user._id,
                role: member.role,
                username: member.fk_id_user.username
            }))

            return res.status(200).json({ message: 'Miembros obtenidos con éxito', members: membersFormat })
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los miembros', error: error.message })
        }
    }

    async createMessage(req, res) {
        try {
            const { idChannel } = req.params
            const { message } = req.body
            const member = req.member

            if (!idChannel) {
                return res.status(400).json({ message: 'Falta el campo requerido: idChannel' })
            }

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
                newMessage: newMessage
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error al crear el mensaje',
                error: error.message
            })
        }
    }

    async messagesChannel(req, res) {
        try {
            const { idChannel } = req.params

            if (!idChannel) {
                return res.status(400).json({ message: 'Falta el campo requerido: idChannel' })
            }

            const messages = await workspaceRepository.getChannelMessages(idChannel)

            return res.status(200).json({ message: 'Mensajes obtenidos con éxito', messages })
        } catch (error) {
            return res.status(500).json({ message: 'Error al obtener los mensajes', error: error.message })
        }
    }

    async deleteMember(req, res) {
        try {
            const { idWorkspace, idMember } = req.params

            const member = req.member

            if (!idMember || !idWorkspace) {
                return res.status(400).json({ message: 'Falta el campo requerido: idMember o idWorkspace' })
            }

            if (!['owner', 'admin'].includes(member.role)) {
                return res.status(403).json({ message: 'No tienes permiso para eliminar miembros.' })
            }

            const deletedMember = await workspaceRepository.deleteMember(idWorkspace, idMember)

            return res.status(200).json({
                message: 'Miembro eliminado con éxito',
                data: deletedMember
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Error al eliminar el miembro',
                error: error.message
            })
        }
    }
}

const workspaceController = new WorkspaceController()
export default workspaceController