jest.mock('../repository/workspaces-repository.js') // se mockea el repositorio de workspaces para controlar su comportamiento en los tests
jest.mock('../repository/user-repository.js') // se mockea el repositorio de usuarios para controlar su comportamiento en los tests
jest.mock('jsonwebtoken') // se mockea jsonwebtoken para simular la generación y verificación de tokens sin depender de su implementación real
jest.mock('../config/mail.config.js') // se mockea el transporter de mail para simular el envío de correos sin depender de un servicio real
jest.mock('../config/cloudinary.js') // se mockea cloudinary para simular la subida de archivos sin depender de un servicio real

import workspaceRepository from "../repository/workspaces-repository.js";
import userRepository from "../repository/user-repository.js";
import jwt from "jsonwebtoken";
import mail_transporter from "../config/mail.config.js";
import cloudinary from "../config/cloudinary.js";
import workspaceController from "../controllers/workspace.controller.js";

const makeRes = () => {
    const res = {}
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
}

beforeEach(() => {
    jest.clearAllMocks()
})

describe('Workspaces Controller', () => {
    describe('getMyWorkspaces', () => {
        test('debe retornar 404 cuando no hay workspaces para el usuario', async () => {
            workspaceRepository.getMyWorkspaces.mockResolvedValue([])
            const req = { user: { id: '1' } }
            const res = makeRes()

            await workspaceController.getMyWorkspaces(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }))
        })

        test('debe retornar 200 con los workspaces del usuario', async () => {
            const mockMembers = [
                { fk_id_workspace: { _id: '1', title: 'Workspace 1', description: 'd1', image: null, created_at: '2024-01-01' } },
                { fk_id_workspace: { _id: '2', title: 'Workspace 2', description: 'd2', image: null, created_at: '2024-01-02' } }
            ]

            const expectedWorkspaces = mockMembers.map(m => ({
                _id: m.fk_id_workspace._id,
                title: m.fk_id_workspace.title,
                description: m.fk_id_workspace.description,
                image: m.fk_id_workspace.image,
                created_at: m.fk_id_workspace.created_at
            }))

            workspaceRepository.getMyWorkspaces.mockResolvedValue(mockMembers)
            const req = { user: { id: '1' } }
            const res = makeRes()

            await workspaceController.getMyWorkspaces(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ workspaces: expectedWorkspaces }))
        })
    })

    describe('createWorkspace', () => {
        test('debe retornar 400 cuando falta title', async () => {
            const req = { user: { id: '1' }, body: {} }
            const res = makeRes()

            await workspaceController.createWorkspace(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe crear workspace y subir imagen cuando hay archivo', async () => {
            cloudinary.uploader.upload.mockResolvedValue({ secure_url: 'http://img' })
            workspaceRepository.createWorkspace.mockResolvedValue({ _id: 'w1', title: 't' })

            const req = {
                user: { id: '1' },
                body: { title: 't', description: 'd' },
                file: { buffer: Buffer.from('x'), mimetype: 'image/png' }
            }
            const res = makeRes()

            await workspaceController.createWorkspace(req, res)

            expect(cloudinary.uploader.upload).toHaveBeenCalled()
            expect(workspaceRepository.createWorkspace).toHaveBeenCalledWith('1', 't', 'd', 'http://img')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('leaveWorkspace', () => {
        test('debe abandonar workspace y retornar 200', async () => {
            workspaceRepository.leaveWorkspace.mockResolvedValue({})
            const req = { params: { idWorkspace: 'w1' }, user: { id: '1' } }
            const res = makeRes()

            await workspaceController.leaveWorkspace(req, res)

            expect(workspaceRepository.leaveWorkspace).toHaveBeenCalledWith('w1', '1')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('deleteWorkspace', () => {
        test('debe retornar 403 si no tiene permisos (ni owner ni admin)', async () => {
            const req = { params: { idWorkspace: 'w' }, member: { role: 'user' } }
            const res = makeRes()

            await workspaceController.deleteWorkspace(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe eliminar workspace si es owner', async () => {
            workspaceRepository.deleteWorkspace.mockResolvedValue({})
            const req = { params: { idWorkspace: 'w' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.deleteWorkspace(req, res)

            expect(workspaceRepository.deleteWorkspace).toHaveBeenCalledWith('w')
            expect(res.status).toHaveBeenCalledWith(200)
        })

        test('debe eliminar workspace si es admin', async () => {
            workspaceRepository.deleteWorkspace.mockResolvedValue({})
            const req = { params: { idWorkspace: 'w' }, member: { role: 'admin' } }
            const res = makeRes()

            await workspaceController.deleteWorkspace(req, res)

            expect(workspaceRepository.deleteWorkspace).toHaveBeenCalledWith('w')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('sendInvitation', () => {
        test('debe retornar 400 cuando faltan campos', async () => {
            const req = { params: { idWorkspace: 'w' }, body: {} , member: { role: 'owner' }}
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 403 si miembro no tiene permisos', async () => {
            const req = { params: { idWorkspace: 'w' }, body: { email: 'a@b.com', role: 'user' }, member: { role: 'user' } }
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe retornar 404 si usuario no existe', async () => {
            userRepository.findByEmail.mockResolvedValue(null)
            const req = { params: { idWorkspace: 'w' }, body: { email: 'a@b.com', role: 'user' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
        })

        test('debe retornar 403 si usuario no verificó email', async () => {
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: false })
            const req = { params: { idWorkspace: 'w' }, body: { email: 'a@b.com', role: 'user' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe retornar 400 si ya es miembro', async () => {
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: true })
            workspaceRepository.findWorkspaceByIdAndUser.mockResolvedValue({})
            const req = { params: { idWorkspace: 'w' }, body: { email: 'a@b.com', role: 'user' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe enviar invitación correctamente', async () => {
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: true })
            workspaceRepository.findWorkspaceByIdAndUser.mockResolvedValue(null)
            jwt.sign.mockReturnValue('tok')
            mail_transporter.sendMail.mockResolvedValue({})

            const req = { params: { idWorkspace: 'w' }, body: { email: 'a@b.com', role: 'user' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.sendInvitation(req, res)

            expect(mail_transporter.sendMail).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('checkInvitation', () => {
        test('debe retornar 400 si falta token', async () => {
            const req = { params: {} }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 400 si rol inválido', async () => {
            jwt.verify.mockReturnValue({ idWorkspace: 'w', email: 'a@b.com', role: 'owner' })
            const req = { params: { token: 't' } }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 404 si usuario no existe', async () => {
            jwt.verify.mockReturnValue({ idWorkspace: 'w', email: 'a@b.com', role: 'user' })
            userRepository.findByEmail.mockResolvedValue(null)
            const req = { params: { token: 't' } }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(404)
        })

        test('debe retornar 403 si usuario no verificado', async () => {
            jwt.verify.mockReturnValue({ idWorkspace: 'w', email: 'a@b.com', role: 'user' })
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: false })
            const req = { params: { token: 't' } }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe retornar 400 si ya es miembro', async () => {
            jwt.verify.mockReturnValue({ idWorkspace: 'w', email: 'a@b.com', role: 'user' })
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: true })
            workspaceRepository.findWorkspaceByIdAndUser.mockResolvedValue({})
            const req = { params: { token: 't' } }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe agregar miembro y retornar 200 cuando todo ok', async () => {
            jwt.verify.mockReturnValue({ idWorkspace: 'w', email: 'a@b.com', role: 'user' })
            userRepository.findByEmail.mockResolvedValue({ id: '2', verify_email: true })
            workspaceRepository.findWorkspaceByIdAndUser.mockResolvedValue(null)
            workspaceRepository.addMember.mockResolvedValue({ _id: 'm1' })

            const req = { params: { token: 't' } }
            const res = makeRes()

            await workspaceController.checkInvitation(req, res)

            expect(workspaceRepository.addMember).toHaveBeenCalledWith('w', '2', 'user')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('workspaceById', () => {
        test('debe retornar 403 si no hay member', async () => {
            const req = { params: { idWorkspace: 'w' } }
            const res = makeRes()

            await workspaceController.workspaceById(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe retornar 200 con workspace si hay member', async () => {
            workspaceRepository.getWorkspaceById.mockResolvedValue({ _id: 'w' })
            const req = { params: { idWorkspace: 'w' }, member: { role: 'user' } }
            const res = makeRes()

            await workspaceController.workspaceById(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ workspace: { _id: 'w' } }))
        })
    })

    describe('getWorkspacesChannels', () => {
        test('debe retornar 200 con canales', async () => {
            workspaceRepository.workspacesChannels.mockResolvedValue([{ name: 'c' }])
            const req = { params: { idWorkspace: 'w' } }
            const res = makeRes()

            await workspaceController.getWorkspacesChannels(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ channels: [{ name: 'c' }] }))
        })
    })

    describe('createChannel', () => {
        test('debe retornar 400 si falta idWorkspace', async () => {
            const req = { params: {}, body: { name: 'n' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.createChannel(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 400 si falta name', async () => {
            const req = { params: { idWorkspace: 'w' }, body: {}, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.createChannel(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 403 si no tiene permisos', async () => {
            const req = { params: { idWorkspace: 'w' }, body: { name: 'n' }, member: { role: 'user' } }
            const res = makeRes()

            await workspaceController.createChannel(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe crear canal y retornar 200', async () => {
            workspaceRepository.createChannel.mockResolvedValue({ _id: 'c1' })
            const req = { params: { idWorkspace: 'w' }, body: { name: 'n', description: 'd' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.createChannel(req, res)

            expect(workspaceRepository.createChannel).toHaveBeenCalledWith('w', 'n', 'd')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    describe('membersWorkspace', () => {
        test('debe retornar 400 si falta idWorkspace', async () => {
            const req = { params: {} }
            const res = makeRes()

            await workspaceController.membersWorkspace(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 200 con miembros formateados', async () => {
            const members = [{ fk_id_user: { _id: 'u1', username: 'u1' }, role: 'admin' }]
            workspaceRepository.getWorkspaceMembers.mockResolvedValue(members)
            const req = { params: { idWorkspace: 'w' } }
            const res = makeRes()

            await workspaceController.membersWorkspace(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ members: [{ _id: 'u1', role: 'admin', username: 'u1' }] }))
        })
    })

    describe('createMessage', () => {
        test('debe retornar 400 si falta idChannel', async () => {
            const req = { params: {}, body: { message: 'hi' }, member: { _id: 'm1' } }
            const res = makeRes()

            await workspaceController.createMessage(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 400 si falta message', async () => {
            const req = { params: { idChannel: 'c' }, body: {}, member: { _id: 'm1' } }
            const res = makeRes()

            await workspaceController.createMessage(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe crear mensaje y retornar 201', async () => {
            workspaceRepository.createMessage.mockResolvedValue({ _id: 'msg1' })
            const req = { params: { idChannel: 'c' }, body: { message: 'hi' }, member: { _id: 'm1' } }
            const res = makeRes()

            await workspaceController.createMessage(req, res)

            expect(workspaceRepository.createMessage).toHaveBeenCalledWith('c', 'm1', 'hi')
            expect(res.status).toHaveBeenCalledWith(201)
        })
    })

    describe('messagesChannel', () => {
        test('debe retornar 400 si falta idChannel', async () => {
            const req = { params: {} }
            const res = makeRes()

            await workspaceController.messagesChannel(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 200 con mensajes', async () => {
            workspaceRepository.getChannelMessages.mockResolvedValue([{ message: 'hi' }])
            const req = { params: { idChannel: 'c' } }
            const res = makeRes()

            await workspaceController.messagesChannel(req, res)

            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ messages: [{ message: 'hi' }] }))
        })
    })

    describe('deleteMember', () => {
        test('debe retornar 400 si faltan params', async () => {
            const req = { params: {} , member: { role: 'owner' }}
            const res = makeRes()

            await workspaceController.deleteMember(req, res)

            expect(res.status).toHaveBeenCalledWith(400)
        })

        test('debe retornar 403 si no tiene permisos', async () => {
            const req = { params: { idWorkspace: 'w', idMember: 'm' }, member: { role: 'user' } }
            const res = makeRes()

            await workspaceController.deleteMember(req, res)

            expect(res.status).toHaveBeenCalledWith(403)
        })

        test('debe eliminar miembro y retornar 200', async () => {
            workspaceRepository.deleteMember.mockResolvedValue({})
            const req = { params: { idWorkspace: 'w', idMember: 'm' }, member: { role: 'owner' } }
            const res = makeRes()

            await workspaceController.deleteMember(req, res)

            expect(workspaceRepository.deleteMember).toHaveBeenCalledWith('w', 'm')
            expect(res.status).toHaveBeenCalledWith(200)
        })
    })

    
})