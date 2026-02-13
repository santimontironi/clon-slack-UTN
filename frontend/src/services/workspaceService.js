import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true
})

export const getMyWorkspacesService = () => {
    return api.get('/api/workspaces/my-workspaces')
}

export const createWorkspaceService = (workspaceData) => {
    return api.post('/api/workspaces/create-workspace', workspaceData, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const deleteWorkspaceService = (idWorkspace) => {
    return api.delete(`/api/workspaces/${idWorkspace}/eliminar`)
}

export const getWorkspaceByIdService = (idWorkspace) => {
    return api.get(`/api/workspaces/${idWorkspace}`)
}

export const getWorkspaceChannelsService = (idWorkspace) => {
    return api.get(`/api/workspaces/${idWorkspace}/canales`)
}

export const createChannelService = (idWorkspace, channelData) => {
    return api.post(`/api/workspaces/${idWorkspace}/agregar-canal`, channelData)
}

export const sendInvitationService = (idWorkspace, invitationData) => {
    return api.post(`/api/workspaces/${idWorkspace}/enviar-invitacion`, invitationData)
}

export const checkInvitationService = (token) => {
    return api.get(`/api/workspaces/invite/${token}`)
}

export const acceptInvitationAfterRegisterService = (token) => {
    return api.post('/api/workspaces/aceptar-invitacion', { token })
}

export const getWorkspaceMembersService = (idWorkspace) => {
    return api.get(`/api/workspaces/${idWorkspace}/miembros`)
}